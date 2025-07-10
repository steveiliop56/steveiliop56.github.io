---
title: "How to network boot your Raspberry Pi"
description: "A simple guide on setting up one or multiple raspberries to network boot from a debian server."
publishedOn: 2024-12-24
author: Stavros
---

Sooo, I always found the idea of just plugging in a raspberry pi with an ethernet cable and a power cord and then magically booting from a server without an SD card fascinating! For this reason I decided to dig a little deeper on how PXE booting works and how I can make my own raspberry pi compatible PXE boot server. I compiled this guide below on how to set up your own server using all the information I could find on the internet. So here it is…

## How does PXE boot work?

PXE boot consists of two parts. The TFTP server and the NFS server. The TFTP server is responsible for detecting the raspberry pi and serving the boot files, this includes the kernel, overlays and configuration files like `cmdline.txt` and `config.txt`. If you like you can put the boot files in an SD card and only retrieve the root filesystem from the server but then network booting would be pointless so in this guide we will use both the TFTP server and the NFS server so we can have a true SD card free boot experience. So the way the raspberry pi works with the TFTP server is that it looks either for boot files in the root of the server or in a subdirectory with the raspberry pi serial number as a name, we can use this to our advantage since we can provide different configuration files for each raspberry pi and point them to different NFS shares for different root filesystems.

## PiServer

Back in the old days there used to be a software called PiServer that was available on the desktop version of raspberry pi os _the one you run on x86 machines_, but this desktop version does no longer seem maintained since it is stuck on debian buster which is really not suitable for the newer models. This is why will need to setup everything manually without a fancy GUI.

## Requirements

But first requirements… We need some supplies to make this happen.

- An x86 machine running debian bookworm (or the latest version of debian, bookworm is the latest one at the time of writing), ideally connected over ethernet to your network
- A raspberry pi _of course_ (everything will work except the zeros since they don't support network booting)
- An SD card (we will need that to make sure our firmware is up to date)
- A power supply for the raspberry pi
- An ethernet switch (your router’s ethernet ports will work too)
- An ethernet cable
- A monitor (we need to get the raspberry pi serial number)
- A micro HDMI to HDMI cable to connect the raspberry pi to the screen

> [!NOTE]
> You could get the raspberry pi serial number and mac address through raspberry pi os too, I just used the go to method of plugging it to a display and reading the status.

## Steps

So enough of the technical part, let's set it up! Here is a step by step guide on all of the steps you should follow:

> [!WARNING]
> You will need to run all commands as root in your debian server so if you aren't root please switch user with `sudo su` or `su`.

### Step 1

Connect an SD card to your computer and flash the latest bootloader firmware for network boot. You can do this by opening Raspberry Pi Imager selecting your raspberry pi version (e.g. 4, 5, 3 etc.) and for operating system select misc utility images, then bootloader and the last option which should be network boot. After you finish writing, plug the SD card into your raspberry pi, power it in and wait until the green led starts flashing, when it does power off the pi and remove the SD card, we will not need it anymore.

### Step 2

Now you should plug your raspberry pi in with a monitor attached and look for the `board` section when the bootloader screen appears. It should look something like this:

`board: abcdef abcdefgh ab:ab:ab:ab:ab:ab`

From there the second string is your serial number (so in the example above the `abcdefgh`) and the final string (so the `ab:ab:ab:ab:ab:ab`) is your mac address. Please note these down as we will need them in the next steps of the guide.

### Step 3

Now back in our fresh Debian install we need to create some directories.

Firstly for holding our operating system:

`mkdir -p /srv/nfs/pi4-1`

> [!NOTE]
> You can use any name you like here, I just used `pi4-1` for convenience. If you do change the name, make sure to replace it on all of the commands below.

And secondly for holding our boot files:

`mkdir -p /srv/tftpboot/your-pi-serial-number`

We also need to set the permissions of this directory with the following command:

`chmod -R 777 /srv/tftpboot`

### Step 4

Now it is time to set a static IP address for our server. In order to do this you need to get your interface name. To get it, I made a small one liner to give you both your current IP address and interface name. Type this command:

`ip route get 1 | awk '{print $7; print $5}' | paste -sd ' '`

And it should give you an output like this `192.168.1.1 eth0`, where the first part is your IP and the second one is your interface name.

So now it is time to disable DHCP for our interface. To do this create a file using nano:

`nano /etc/systemd/network/10-your-interface.netdev`

Add the following content:

```
[Match]
Name=your-interface

[Network]
DHCP=no
```

Then save and exit with `CTRL` + `X` then `Y` and `ENTER`.

Now we need to manually assign an IP address to our interface. To do so we need to create a network file, this can be done with the following command:

`nano /etc/systemd/network/11-your-interface.network`

Inside this file we add the following content:

```
[Match]
Name=your-interface

[Network]
Address=10.42.0.211/24
DNS=10.42.0.1

[Route]
Gateway=10.42.0.1
```

In this file you also need to set the `Address` to your server’s IP we got before and make sure to attach the `/24` in the end. Additionally you need to set the `DNS` and `Gateway` to your router’s IP. Your router’s IP is most likely your server’s IP with a 1 in the end. For example, if your server’s IP is `192.168.1.15`, your router’s address should be`192.168.1.1` .

Finally we need to set our DNS correctly, this can be done by editing the following file:

`nano /etc/systemd/resolved.conf`

And replacing the contents with:

```
[Resolve]
DNS=10.42.0.1
```

Make sure to set the `DNS` to the IP address of you router.

Last but not least restart the networking service with:

`systemctl enable systemd-networkd`

And reboot:

`reboot`

### Step 6

Now it is time to install `dnsmasq`, this service will host our TFTP directory containing our boot files. To install it run the following command:

`apt install tcpdump dnsmasq -y`

Then enable it with:

`systemctl enable dnsmasq`

Now it is time for a small test to make sure everything is set up correctly up to this point. To check run this command:

`tcpdump -i eth0 port bootpc`

And plug your raspberry pi in (without an SD card) and connect an ethernet cable _of course_. After some time you should see something like this:

`IP 0.0.0.0.bootpc > 255.255.255.255.bootps: BOOTP/DHCP, Request from ab:ab:ab:ab:ab:ab...`

Where `ab:ab:ab:ab:ab:ab` should be your pi’s MAC address. If you see more requests from other devices don’t get worried, you can safely ignore them, we are just looking for the pi’s MAC.

After ensuring everything works it’s time to configure `dnsmasq`, to do so firstly clear the config with:

`echo | tee /etc/dnsmasq.conf`

Then edit it with:

`nano /etc/dnsmasq.conf`

And add the following content:

```
port=0
dhcp-range=10.42.0.255,proxy
log-dhcp
enable-tftp
tftp-root=/srv/tftpboot
pxe-service=0,"Raspberry Pi Boot"
```

Make sure to replace `10.42.0.255` with your own network’s broadcast address. To get it, get your server’s IP from the previous step and replace the last part with 255. For example if your server’s IP is `192.168.1.2`, your broadcast address is `192.168.1.255`.

### Step 7

Now it is time to set up our operating system. To do so we need to download the image with:

```
cd /srv
wget https://downloads.raspberrypi.com/raspios_arm64/images/raspios_arm64-2024-11-19/2024-11-19-raspios-bookworm-arm64.img.xz
```

This is for the `arm64` version, if your raspberry pi doesn’t support arm64 you can use this URL:

`https://downloads.raspberrypi.com/raspios_armhf/images/raspios_armhf-2024-11-19/2024-11-19-raspios-bookworm-armhf.img.xz`

> [!WARNING]
> These are the latest versions of the images at the time of writing. Before following the next steps please visit https://www.raspberrypi.com/software/operating-systems/, right click the appropriate download button and get the latest image link.

Now it’s time to extract it with:

`unxz 2024-11-19-raspios-bookworm-arm64.img.xz`

And now create some loop devices from our image with:

`kpartx -av 2024-11-19-raspios-bookworm-arm64.img`

> [!NOTE]
> If you get `bash: kpartx: command not found` you can install it with `apt install -y kpartx`

Now it’s time to mount our loop devices, this can be done by firstly creating our mountpoints:

`mkdir -p /tmp/{boot,os}`

And then mounting the loop devices:

`mount -o loop /dev/mapper/loop0p1 /tmp/boot/`

`mount -o loop /dev/mapper/loop0p2 /tmp/os/`

After this, we need to copy our data with:

`cp -r /tmp/os/* /srv/nfs/pi4-1`

`mkdir -p /srv/nfs/pi4-1/boot`

`rm -rf /srv/nfs/pi4-1/boot/*`

`cp -r /tmp/boot/* /srv/nfs/pi4-1/boot`

Finally we can unmount our mounts and loop devices with:

`umount /tmp/os/`

`umount /tmp/boot/`

`kpartx -dv 2024-11-19-raspios-bookworm-arm64.img`

And restart `dnsmasq` :

`systemctl restart dnsmasq`

### Step 8

Now it is time to install our NFS server, this can be done with:

`apt install nfs-kernel-server -y`

Before proceeding we need to create a bind mount for our boot directory, this can be done with the following command:

`echo "/srv/nfs/pi4-1/boot /srv/tftpboot/your-pi-serial-number none defaults,bind 0 0" >> /etc/fstab`

And mount the directories with:

`systemctl daemon-reload`

`mount -a`

Then we need to create our exports:

`echo "/srv/nfs/pi4-1 *(rw,sync,no_subtree_check,no_root_squash)" | tee -a /etc/exports`

> [!NOTE]
> You can replace the asterisk (`*`) with the IP that your router gives to your pi so only this pi can access this filesystem. To get your pi’s IP, hook it up without an SD card to a monitor with an ethernet cable attached and look for `YI_ADDR`

Finally we need to restart all services to detect the new files:

```
systemctl enable rpcbind
systemctl restart rpcbind
systemctl enable nfs-kernel-server
systemctl restart nfs-kernel-server
```

### Step 9

Now we need to remove the unused mounts from our `fstab`, this can be done with:

`sed -i /UUID/d /srv/nfs/pi4-1/etc/fstab`

We also need to tell the pi where the NFS share is by editing the `cmdline` file with this command:

`nano /srv/nfs/pi4-1/boot/cmdline.txt`

Delete everything after `root` (including it) and add the following:

`root=/dev/nfs nfsroot=your-ip:/srv/nfs/pi4-1,vers=3 rw ip=dhcp rootwait`

And finally create out user account with:

`echo pi:$(openssl passwd -6 raspberry) > /srv/nfs/pi4-1/boot/userconf.txt`

This command creates an account with username `pi` and password `raspberry`.

(Optional) We can also enable SSH by running this command:

`touch /srv/nfs/pi4-1/boot/ssh`

Lastly I noticed that we need to fix some small permissions issues which can be fixed by running these commands:

`chown -R 1000:1000 /srv/nfs/pi4-1/home/pi`

`chown root:root /srv/nfs/pi4-1/usr/bin/sudo`

`chmod 4755 /srv/nfs/pi4-1/usr/bin/sudo`

### Step 10

And we are done! Now you should be able to plug your raspberry pi in, with nothing but the power cable and an ethernet cable and it should automatically pick up the OS and boot!

## Conclusion

So that’s it! We just made a raspberry pi boot from a server automatically through the network! With this setup you can create as many filesystems as you like and network boot a lot of raspberries for companies, schools, homelabs and for fun _of course_. Thanks a lot to [this](https://www.reddit.com/r/raspberry_pi/comments/l7bzq8/guide_pxe_booting_to_a_raspberry_pi_4/) reddit post for providing a lot of information on how to achieve network boot and match the functionality of the PiServer software. That’s it for now…see ya!
