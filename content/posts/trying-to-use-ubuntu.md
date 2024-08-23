+++
title = 'Trying to use Ubuntu'
date = 2024-08-24
draft = true
+++

So, I've been using windows since the day I got my first laptop, why? Because I am loving it. But I am starting to see Microsoft changing things in a way I don't like. These changes don't affect me since I am using my windows laptop with a Microsoft account so I am avoiding all the bloat. However, that doesn't mean I believe that people actually paying 120 euro or more for a Windows key and still getting ADs in the operating system which they paid for isn't really nice. So, after my friends annoyed me for a while, I decided to try Ubuntu (once again). Let's see what happened...

## Installing Ubuntu

Installing Ubuntu is really easy, you flash a USB drive with the ISO, reboot and install...not this time though. This time Microsoft fixed a security issue in the GRUB bootloader and with that it _accidentally_ killed all dual boot setups
with an error message saying `Something has gone seriously wrong`...yeah, I think we noticed Microsoft. For dual booters it was quite a pain to fix it but for me it was as easy as just disabling Secure Boot before installing and then enabling it again. After doing this I was able to install just fine.

## Fractional scaling

One of the biggest issues I am facing with Linux is fractional scaling, fractional scaling essentially zooms your screen, why is that useful? Because I have a HIDPI display and with `100%` zoom I can't see anything _I mean I can but everything is way too small_. I could use X and fractional scaling but since it's not really that stable, I simply changed my font size to `1.5` and zoomed my icons to 48 pixels. Everything looked good.

## Customizing

Next step was to customize everything a bit because the default Ubuntu desktop is just...meh. I installed the [Orchis](https://www.gnome-look.org/p/1357889/) theme which is really nice, installed the [Papirus Icon Theme](https://github.com/PapirusDevelopmentTeam/papirus-icon-theme), disabled the default Ubuntu dock and installed [Dash To Dock](https://extensions.gnome.org/extension/307/dash-to-dock/) a much better dock with much more customizability. Finally I installed [Bing Wall](https://snapcraft.io/install/bing-wall/ubuntu) to get the awesome Bing wallpapers.

## Installing my apps

Installing my apps was relatively easy, I opened the Appstore clicked some install buttons and everything worked. I also downloaded some `deb` packages for some extra software and everything was looking good.

## The disaster

I wanted to install two of my favorite apps, Lunar Client and Viber. So, I opened Chrome, searched `Viber Linux download` clicked the first link and I was presented with...an app image, really? An app image? Anyway, I downloaded it, made it executable and run `./Viber.AppImage`, error, fuse is required. No big deal, I opened Chrome, searched `Install fuse ubuntu`, clicked the first link...`sudo apt install fuse3`, I run the command, fuse installs, I run the app image, Viber launches, I am happy. Now in order to make it easier to run I made a desktop file to add Viber to my apps (same for Lunar Client). Everything seems fine until...I noticed my file manager is missing, I said `Huh that's weird` and opened the apps menu and searched for `Files`, nothing. What? I opened the terminal, run `nautilus`, command not found. What the f\*ck? I opened Chrome, searched `Ubuntu nautilus missing`, I stumble across a forum post saying `Ubuntu desktop removed after installing fuse`, I think `Oh no`, I reboot, login screen, enter my password, nothing, I click the session setting and would you look at that...MY WHOLE DESKTOP JUST GOT UNINSTALLED!

## Removing Ubuntu

Yeah, I am not going to sit here reinstalling the whole thing, I straight up rebooted to UEFI settings, set `Windows Boot Manager` as the first option, booted Windows, opened disk management and deleted the Ubuntu partition without a second thought. Then I opened a CMD prompt, mounted the `System` partition and deleted GRUB. _did I mention I hate GRUB?_

## Conclusion

Ubuntu is just...not for me. I hate it. A lot. From now on I will never install Linux on my laptop again, except WSL, we all know WSL is the best developer thing, right? Now somebody will say `You should have been more careful and read the message before hitting enter` and I respond to that by saying my operating system should have been more careful by not letting me uninstall my desktop without saying `ARE YOU SURE BRO?`. Have you heard of windows uninstalling itself? Because I haven't. Anyway, from now on I will be the biggest Windows fanboy out there until...either Microsoft makes this operating system bloatware or Ubuntu gets too good. That's it. Windows for life!
