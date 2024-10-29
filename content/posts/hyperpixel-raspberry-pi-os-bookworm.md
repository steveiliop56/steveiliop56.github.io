+++
title = 'Hyperpixel screen with Raspberry Pi OS Bookworm, the ultimate guide'
date = 2024-10-29
draft = false
+++

Sooo, a lot of things have changed in Raspberry Pi OS since the buster version that the Hyperpixel screen was originally configured to work with. To be more specific there have been a lot of major changes including new kernels, rewritten parts of the desktop and the most important, the change to Wayland from x11. Pimoroni has tried its best to maintain compatibility with all these changes and they have managed to get the screen working, but by working we mean that the screen displays the desktop, that’s where they left the rest for us. I have spent a lot of time trying to create the optimal setup because I refuse to buy the official 7 inch display due to how heavy and big it is. So let me show you how I set up my Raspberry Pi 5 with the Hyperpixel 4’ inch display to have the best experience.

> Note 📝: This blog post is about the October 22nd 2024 release of Raspberry Pi OS, which switched from the wayfire compositor to the labwc one.

> Note 📝: I recommend you use a physical keyboard and mouse instead of a VNC connection because of the rotations the screen will do and the changes that will happen to the cursor.

## Changes in `config.txt`

As far as the `config.txt` file goes we only need to do some small changes to enable the screen driver in the kernel. This can be easily done by editing the `/boot/firmware/config.txt` file and adding the following lines after the `[all]` section:

```
# Hyperpixel
dtoverlay=vc4-kms-dpi-hyperpixel4
dtparam=rotate=90,touchscreen-swapped-x-y,touchscreen-inverted-y
```

This basically loads the Hyperpixel kernel overlay and rotates the screen 90 degrees, in a landscape configuration (meaning that the USB-C and HDMI ports will be on the top side and the USB ports on the left) and also inverts the touch to work with the rotation. After you edit your config save and exit then reboot. When the Pi boots up again you should see the desktop in a portrait configuration (meaning that the USB-C and HDMI ports are on the right and the USB ports on the top) but don’t worry we will fix that now.

## Rotating the screen correctly

Now it is time to set our screen in a landscape configuration. This can be done by firstly opening the Screen Configuration tool (located in the Preferences menu). There you should see your main display called DPI-1 if you have more displays attached make sure to apply all the changes to this specific one. Right click in the display and set the following options:

Active: `yes` (should be enabled by default)

Resolution: `480×800` (should be the only one)

Frequency: `60.061Hz` (should be the only one)

Orientation: `Right`

Touchscreen: `11-005d Goodix Capacitive TouchScreen` (you may not have the exact same but you should just only have one option, so pick that one)

Brightness: `100%` (should be the default one)

When you are done click Apply, the screen should rotate and then the Screen Configuration tool will show you a small popup with a countdown asking you to click OK if everything is good, there just click OK.

> Note 📝: If you are using VNC your cursor will get inverted when you click apply so you will have to close the connection and reconnect and then you can click OK in the popup.

And we are almost done, you may notice that your touch got messed up so let’s fix that.

## Fixing the touch

When rotating the screen you may notice that your touch got inverted and that’s because our new configuration messes up the `dtparam` options we set earlier resulting in the touch being inverted, this can be easily fixed by telling labwc not to map the touch to the screen. To do this, edit the `.config/labwc/rc.xml` file (in your home directory) and go to the end of the file until you see `<touch deviceName="11-005d Goodix Capacitive TouchScreen" mapToOutput="DPI-1" mouseEmulation="yes"/>` there just remove the `mapToOutput="DPI-1"` part and then save and exit. When you are done editing the file, either logout and log back in or reboot. When your desktop reappears, your touch should be working correctly and the cursor should be moving along with your finger.

## Enabling the on-screen keyboard

Chances are that you want to have an on-screen keyboard if using a touchscreen, Raspberry Pi OS should technically autodetect the screen and enable it for you but in my testing I noticed that it wouldn’t show the keyboard on things like the login screen, but don’t worry because we can ensure that the keyboard is always on. This can be done by opening the Raspberry Pi Configuration tool (located in the Preferences menu), then going to the Display section and changing the On-Screen Keyboard to Enabled Always. After enabling it you should also see a small keyboard icon on the top right of your screen which can be used to toggle the keyboard (the keyboard auto appears on text inputs but some times it can be annoying so this button allows you to hide it e.g. on terminal windows).

## Screen blanking

I have tried countless times to set up screen blanking with wayfire and labwc and it has been a pain. I have gone in depth in my blog post [here](https://doesmycode.work/posts/screen-blanking-labwc/) but to sum up you just need to follow two simple steps to get it working. Firstly install this little tool called `brightnessctl` which will help you turn on and off the screen backlight. You can install it with `sudo apt update && sudo apt install brightnessctl -y` . When you are done go to the Raspberry Pi Configuration tool (located in the Preferences menu), then Display and enable screen blanking, then click Ok and it will ask you to reboot but click No because we need to change one small thing. We simply need to edit the `.config/labwc/autostart` file (in your home directory) with `sudo` and replace the contents with `swayidle -w timeout 600 'wlopm --off \* && brightnessctl -d \* -q set 0' resume 'wlopm --on \* && brightnessctl -d \* -q set 100' &`, this will ensure both the DPI displays and the HDMI displays will go black after 10 minutes and they will both wake when you move your mouse or touch the screen.

## That’s it!

And that’s it! You should now have a fully functional setup with your Raspberry Pi and the Hyperpixel 4’ inch display. If you have a Raspberry Pi 5 and a 3D printer you may be interested in printing yourself a cool little case I made [here](https://www.printables.com/model/1026124-hyperpixel-raspberry-pi-5-case-v2), I also have a version for the Raspberry Pi 4 [here](https://www.printables.com/model/867835-hyperpixel-4-inch-display-and-raspberry-pi-5-case) but I would recommend the one made from asmoll01 [here](https://www.thingiverse.com/thing:4095591). I hope this guide helped you clearing things up on this mess and I will try to keep it up to date if any changes occur. Have fun!
