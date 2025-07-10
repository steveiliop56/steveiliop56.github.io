---
title: "Extending LUKS volumes in Windows and Fedora dual boot"
description: "Turns out resizing encrypted partitions is not that easy."
publishedOn: 2025-07-10
author: Stavros
---

# Extending LUKS volumes in Windows and Fedora dual boot

Sometimes you have a setup where you firstly installed Windows and then some distribution like Fedora where you can opt-in for disk encryption using LUKS and a btrfs volume. This is amazing until you need to extend one of the operating system's partition, this where things get _tricky_. After spending a reasonable amount of time trying to make my own laptop work without losing any data I am confident I can share a guide on how you can do it too.

## Requirements

Before starting this process, I **strongly** advise you to create a backup since a lot of things can go wrong. Additionally you will need an 8GB+ USB drive which we will use to live boot in order to resize the partitions.

## Flash the USB drive

Firstly you will need to flash the USB drive with an operating system of your choice. Since I am using Fedora as my daily Linux distribution I chose it for the process of resizing the partitions. I recommend **against** the GParted live boot option as it is limited to only partitioning and lacks support for drivers for networking so you won't be able to copy paste any commands or browse the internet.

## Creating a new btrfs partition

After you boot in the live environment, I firstly recommend connecting to the internet and installing GParted. This is because we will use a combination of GParted and Gnome Disk Utility to create our partitions.

After you have both tools installed, launch GParted, unlock your drive and shrink it. I decided to split exactly in half but you can create a larger volume if you like. In any case the new partition **must** be either the **same** size or **larger**. Keep in mind that the space you leave to your current partition will be the free space you will be able to allocate to other partitions later on. After you split the partition you can apply the changes and you should end up with a some free space next to your Linux partition.

Back to the Gnome Disk Utility, select your free space and click the `+` icon to create a new partition. For storage select all available space and for Type select Other, you can also set a volume name if you like. In the next window select your file system (which will be btrfs) and enable LUKS encryption if you like. Finally make sure both your new and old partitions are unlocked and note down the Device paths of both partitions.

## Copying the btrfs data

> [!NOTE]
> All commands from now on should be run as `root`.

Now that we have our new partition, we need to copy the data from the old one. This can be done by firstly creating a mountpoint for our data:

```sh
mkdir /mnt/data
```

Then we can mount the partition data using:

```sh
mount /dev/mapper/luks-uuid-of-old-partition /mnt/data
```

> [!NOTE]
> In this example it's assumed you are using LUKS encryption. If you are not using encryption your device path will probably look something like `/dev/sdaX`.

Now it's time to add the new partition to our current btrfs file system, this can be done with:

```sh
btrfs device add /dev/mapper/luks-uuid-of-new-parition /mnt/data
```

Now our file system contains two partitions but only one holds data. Let's change that by balancing our files:

```sh
btrfs balance start --full-balance /mnt/data
```

> [!WARNING]
> This process can take from some minutes to some hours depending on your files, it took ~5 minutes for my ~50GB worth of files but it could take more or less time depending on your system specs. **Do not** interrupt the balance process as if something goes wrong you can risk losing access to your data.

This command is silent but you can monitor the balance process by running:

```sh
btrfs balance status /mnt/data
```

After the balance process finishes we need to confirm that everything was copied correctly, we can do so by using the file system show command:

```sh
btrfs filesystem show /mnt/data
```

You should see your files split in half across the two partitions. We only need the new partition so let's remove the old one:

```sh
btrfs device remove /dev/mapper/luks-uuid-of-old-parition /mnt/data
```

This command will also take some time since it will need to move all the files from the old partition to the new one. After it's done we can check our new file system with the show command:

```sh
btrfs filesystem show /mnt/data
```

If everything went well you should only have one partition with all of your data.

## Fixing GRUB and crypttab

Before continuing we need to change some things in GRUB and in crypttab so as our drive can be recognized and boot normally.

For the crypttab part you need to edit the `/etc/crypttab` file with your favorite editor and replace the `luks-some-uuid` and `UUID=some-uuid` with the new UUID of the partition.

For GRUB you need to edit the `/etc/default/grub` and replace `GRUB_CMDLINE_LINUX="rd.luks.uuid=luks-some-uuid-of-old-partition rhgb quiet"` with your new partition UUID alongside with the `luks-` prefix.

Now you can unmount the filesystem by running `umount /mnt/data`.

## Fixing the boot partition

The boot partition still holds some outdated UUIDs we need to update. This can be done by mounting the boot partition which is the tiny 1GB partition right before the Fedora one. After you obtain the path you can create a mountpoint:

```sh
mkdir /mnt/boot
```

And mount the partition using:

```sh
mount /dev/your-partition /mnt/boot
```

Now we need to edit the `/mnt/boot/grub2/grub.cfg` file and replace all instances of the old UUID with the new UUID. This can be done with the `sed` command like so:

```sh
sudo sed -i 's/luks-uuid-of-old-partition/luks-uuid-of-new-partition/g' /mnt/boot/grub2/grub.cfg
```

We also need to do the same for the GRUB configuration files. This can be done by going to the config directory:

```sh
cd /mnt/boot/loader/entries
```

And again using the `sed` command to replace the old UUIDs with the new ones.

```sh
sed -i 's/luks-uuid-of-old-partition/luks-uuid-of-new-partition/g' *.conf
```

And now we can also unmount the boot partition with:

```sh
umount /mnt/boot
```

## Moving the free space

Since our data now live in the right partition we can delete the left one and have some free space. Then in this free space we can move the boot partition all the way to the right with GParted. Make sure **not** to change the size of the boot partition, it should be exactly 1024MB. After moving the boot partition you will have the free space next to your Windows installation and from there you can use the Windows Disk Management tool to extend your partition to the maximum available space.

## Booting into Fedora and final touches

After rebooting you should be able to boot into Fedora normally, I recommend pressing the escape button while loading to check for any errors. After you boot I recommend generating the GRUB config again because even though we fixed it with the `sed` commands we can ensure we didn't miss anything since GRUB will use the `/etc/default/grub` config file to generate everything. You can generate the GRUB config by using:

```sh
grub2-mkconfig -o /etc/grub2.cfg
grub2-mkconfig -o /etc/grub2-efi.cfg
```

Reboot one last time to use the updated GRUB configs and you should be good to go!

## Conclusion

All in all, even though the process may seem dangerous and complex it can definitely help you avoid the need to format just for reorganizing your storage. This guide should also apply for _borrowing_ storage from the Windows partition by following the steps in the reverse order _although it is not tested_. In any case you should ensure you have proper backups before attempting such procedures.
