---
title: "Hyperpixel screen with Raspberry Pi OS Bookworm, the ultimate guide"
description: "The ultimate guide in getting the Hyperpixel screen working in Raspberry Pi OS Bookworm"
publishedOn: 2024-10-29
author: Stavros
---

Sooo, a lot of things have changed in Raspberry Pi OS since the buster version that the Hyperpixel screen was originally configured to work with. To be more specific there have been a lot of major changes including new kernels, rewritten parts of the desktop and the most important, the change to Wayland from x11. Pimoroni has tried its best to maintain compatibility with all these changes and they have managed to get the screen working, but by working we mean that the screen displays the desktop, that’s where they left the rest for us. I have spent a lot of time trying to create the optimal setup because I refuse to buy the official 7 inch display due to how heavy and big it is. So let me show you how I set up my Raspberry Pi 5 with the Hyperpixel 4’ inch display to have the best experience.

> Note 📝: This blog post is about the October 22nd 2024 release of Raspberry Pi OS, which switched from the wayfire compositor to the labwc one.

> Note 📝: I recommend you use a physical keyboard and mouse instead of a VNC connection because of the rotations the screen will do and the changes that will happen to the cursor.

## Changes in `config.txt`

As far as the `config.txt` file goes we only need to do some small changes to enable the screen driver in the kernel. This can be easily done by editing the `/boot/firmware/config.txt` file and adding the following lines after the `[all]` section:

```
# Hyperpixel
dtoverlay=vc4-kms-dpi-hyperpixel4
dtparam=rotate=90
```

This basically loads the Hyperpixel kernel overlay and rotates the screen 90 degrees, in a landscape configuration (meaning that the USB-C and HDMI ports will be on the top side and the USB ports on the left). After you edit your config save and exit then reboot. When the Pi boots up again you should see the desktop in a portrait configuration (meaning that the USB-C and HDMI ports are on the right and the USB ports on the top) but don’t worry we will fix that now.

## Rotating the screen correctly

Now it is time to set our screen in a landscape configuration. This can be done by firstly opening the Screen Configuration tool (located in the Preferences menu). There you should see your main display called DPI-1 if you have more displays attached make sure to apply all the changes to this specific one. Right click in the display and set the following options:

Active: `yes` (should be enabled by default)

Resolution: `480×800` (should be the only one)

Frequency: `60.061Hz` (should be the only one)

Orientation: `Right`

Touchscreen: `11-005d Goodix Capacitive TouchScreen` (you may not have the exact same but you should just only have one option, so pick that one)

Brightness: `100%` (should be the default one)

When you are done click Apply, the screen should rotate along with the touch and the Screen Configuration tool will show you a small popup with a countdown asking you to click OK if everything is good, there just click OK.

> Note 📝: If you are using VNC your cursor will get inverted when you click apply so you will have to close the connection and reconnect and then you can click OK in the popup.

And we are almost done.

## Enabling the on-screen keyboard

Chances are that you want to have an on-screen keyboard if using a touchscreen, Raspberry Pi OS should technically autodetect the screen and enable it for you but in my testing I noticed that it wouldn’t show the keyboard on things like the login screen, but don’t worry because we can ensure that the keyboard is always on. This can be done by opening the Raspberry Pi Configuration tool (located in the Preferences menu), then going to the Display section and changing the On-Screen Keyboard to Enabled Always. After enabling it you should also see a small keyboard icon on the top right of your screen which can be used to toggle the keyboard (the keyboard auto appears on text inputs but some times it can be annoying so this button allows you to hide it e.g. on terminal windows).

## Screen blanking

As of 31/10/2024 we managed to identify and solve the issue in the wayvnc server which would control the display's power state at all times meaning that `wlopm` wouldn't work. This is now fixed and a new wayvnc package is probably released as an update, meaning that the only step you have to do to enable screen blanking is update your system and then just turn on the setting in the Raspberry Pi Configuration tool and everything should work.

## That’s it!

And that’s it! You should now have a fully functional setup with your Raspberry Pi and the Hyperpixel 4’ inch display. If you have a Raspberry Pi 5 and a 3D printer you may be interested in printing yourself a cool little case I made [here](https://www.printables.com/model/1026124-hyperpixel-raspberry-pi-5-case-v2), I also have a version for the Raspberry Pi 4 [here](https://www.printables.com/model/867835-hyperpixel-4-inch-display-and-raspberry-pi-5-case) but I would recommend the one made from asmoll01 [here](https://www.thingiverse.com/thing:4095591). I hope this guide helped you clearing things up on this mess and I will try to keep it up to date if any changes occur. Have fun!
