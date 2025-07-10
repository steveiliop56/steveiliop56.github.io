---
title: "Trying to make screen blanking work in labwc"
description: "Let me show you how I finally managed to get screen blanking working in Labwc."
publishedOn: 2024-06-26
updatedOn: 2024-11-03
author: Stavros
---

> [!NOTE]
> As of 31/10/2024 this issue has been fixed, turns out it was an issue in the wayvnc server. [Here](https://doesmycode.work/posts/hyperpixel-raspberry-pi-os-bookworm) is my latest post on the best setup with the hyperpixel screen and the new raspberry pi os with the labwc compositor.

Sooo I use my raspberry pi 5 with a hyperpixel screen, but my setup has an issue, screen blanking doesn't work, that's a big problem! In this hell of debugging mess I will try to find a solution to make screen blanking work on the pi, or at least try.

## The problem

Due to some problems with the wayfire compositor "not mapping pointer to something" (I don't really know what that means), when rotating the screen and trying to connect with a vnc server to the pi the mouse would be inverted, big problem. After opening an issue on raspberry pi forums an engineer told me to switch to the new beta compositor called labwc, so I installed the package, enabled it, rotated the screen, tried to vnc in and it worked! Vnc worked! But then I had another issue... Screen blanking wouldn't work, screen blanking is just turning off the screen after some time nothing else, it is a big deal for me and it was very annoying that it wouldn't work. I tried to get some help in the raspberry pi forums but unfortunately no luck there so I had to take matters into my own hands.

## The initial investigation

So the first thing I tried to do is of course checking out how the screen blanking works. I checked the source code of raspi-config and found the options for enabling screen blanking on labwc and wayfire. The key difference is that wayfire has a built-in way of doing this using a config option, but on the other side labwc uses a combination of. the sway-idle and wlopm commands to control the display power mode. The sway-idle command is very simple it just runs a command after some time and another one when something happens so we are not interested in that. The wlopm command though is the actual thing controlling the display. So I launched a terminal run `wlopm --off DPI-1` and got the beautiful error message saying that it failed to set power mode, meh, I expected something like this. Then I quite gave up on it since I thought the wlopm command was the problem.

## The second investigation

The second investigation was a bit more thorough, I tried looking at the wlopm source code but since I don't know C++ I couldn't understand anything, the next step for me was to open an issue on labwc itself. After opening the issue I was told to build labwc with some added logging so we can figure out what is happening, after 3 reflashes of pi os and trying to build labwc I was continuously getting link errors and I could not figure out a way to make it work, the investigation pauses for a second time.

## Final investigation

The final investigation was the most in depth one as I took matters into my own hands. I firstly launched a new tty session on my pi and simply used the labwc or the labwc-pi (which is simply a polished labwc starter script adding only some extra styles) and tried to use the wlopm command there and to my surprise the display turned off when I run it. Amazing! So by launching labwc ourselves works but that doesn't make a lot of sense since lightdm already launches it with out user... So maybe it's lightdm? I looked through every single config files and enabled the highest level of logs I could set and tried to debug labwc to see if something is wrong but unfortunately nothing, no errors no nothing, we are back where we started. So at this point we know its not lightdm and probably not labwc? Let's make sure, I disabled the graphical user interface on raspi-config and when it booted up I simply run the labwc-pi command loading the desktop, then I tried running wlopm and to nobody's surprise it failed, I am really stuck now! Let's try using the wayfire compositor, I opened raspi-config, enabled wayfire, rebooted, opened a terminal, `wlopm --off DPI-1` and guess what, failed to set power mode! Wlopm is out problem here! But since I cannot fix it myself not knowing how C++ I tried researching for similar tools.

## So close to the solution

After some research I found this awesome little tool called brightnessctl, it is a simple tool that can control the brightness of your display and luckily it is available on the debian package repositories. So I installed it on my pi, run it and the screen turned off! The screen blanking actually worked! I immediately replaced the old wlopm command with my brightnessctl command in the labwc pi, waited 10 minutes and the display turned off! Finally! My happiness didn't last long though as I then discovered that this command only works on displays supporting backlight control like DSI/DPI displays which is really disappointing, I essentially only found a solution for my screen... It is still a win though since screen blanking is working!

## Conclusion

All in all I am quite happy my screen is not on 24/7 but I would be happier if that was the case for everyone using the labwc compositor which will soon become the default. I will keep investigating and hopefully I will figure out a better solution, or the pi engineers will...
