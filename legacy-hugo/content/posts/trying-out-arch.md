+++
title = 'Trying out arch linux'
date = 2024-06-28
draft = false
+++

We all have heard of the famous "I use arch btw" phrase to indicate that someone for some reason is using arch, the hardest operating system out there. Well today I tried it myself so I can say that I use arch too, btw.

## Fetching the iso

I am quite embarrassed to say that it took me half an hour to find where to download the iso installer, I am used to clicking the big old Download Iso button which just downloads the iso file, but not with arch, with arch you need to pick a mirror manually and then go to the mirror and download the thing, very complicated.

## Installation

The installation is a pain, there is a tool that's like the alpine installer which does everything for you but then... What's the point? I of course chose the hardest route and started reading their installation guide. I started with setting my keyboard layout, language and timezone. Then I formatted my disk using `fdisk` which was hard because I couldn't understand that I simply had to type `+4G` for the partition to be created, spent another half an hour there. So after creating my partitions I installed the kernel, firmware and the Linux package, lol, that was funny and then installed grub. Then I rebooted only to see that I forgot to generate the grub config, so here we go again with the installer creating the grub config. After I finished with all that, arch booted! Amazing! Let's try to install a fricking editor because it doesn't have neither nano not vim. Oh common no internet? Yeah of course I forgot to configure the networking, one last trip to the installer to add some config and yeah! We have internet!

## Installing a desktop environment

Now that we have a system to work with we can easily install the gnome desktop with one command `pacman -S gnome`, after 5 minutes all packages were installed successfully, then I had to enable the desktop environment using `systemctl enable --now gdm` and that was it! The desktop popped up immediately, I was honestly impressed! Then I just made some small customizations and everything worked fine.

## Documentation

The documentation on arch is one of the best docs sites I have ever seen, it is really helpful, _I mean it needs to be with how hard the OS is_, and everything it says actually works. The only "issue" is that sometimes it may have a small section describing something important that I don't notice and skip an important step, _networking_.

## Final thoughts

After installing the desktop environment, I stopped there, that was enough for me, but I have to admit it was a fun experience. Would I use it as my daily driver? No. Will I start telling my friends "I use arch btw"? Yes of course I will. Arch Linux is really fun but definitely not something you would want to run on your main computer, except if you know what you are doing, I don't, so I will keep being a hardcore windows user _lol_.
