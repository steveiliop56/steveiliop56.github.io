+++
title = 'Casa OS vs Umbrel vs Runtipi what should you choose?'
date = 2024-06-27
draft = false
+++

A lot of people like using some kind of self-hosted app management platform so they can manage their app updates and easily install new apps without having to write the docker compose file themselves. There are many self-hosted orchestrators out there but the 3 most popular free and open source projects are Runtipi, Casa OS and Umbrel, they are all really nice projects with small differences so let's see what's the perfect one for you.

## Project Maintenance

Concerning the maintenance of the projects, Casa OS has funding from it's parent company Ice Whale Tech which also makes the popular SBC called Zimaboard which of course comes pre-installed with Casa OS so the development is pretty active since it has dedicated developers, Umbrel is pretty much the same since it sells the Umbrel Home computer, a mini PC based on the n100 CPU and it gets funding to pay the developers working full time.

On the other hand the maintenance of Runtipi is pretty much the free time of the main developer Nicolas and all the contributors who help build the app, so unlike Umbrel and Casa OS, Runtipi doesn't generate any revenue except the donations on GitHub.

## Installation

The installation for both Runtipi and Casa OS happens with an easy one like bash install script that configures everything for you and gets you up and running.

On the other side in order to install Umbrel you need to download their iso image and install it on your computer erasing all previous data which I think isn't really ideal. Here I do have to mention that all these three apps offer ready to go images for the raspberry pi.

The initial setup of all the apps is almost the same as you are asked to create an account and you are ready to go.

## Initial impression

Casa OS and Umbrel have a homepage where you can have app widgets, manage your applications and install new ones through the app store. The whole experience feels like a tablet since you are simply opening the App Store and installing apps like you would on a tablet. Umbrel also includes a navigation dock on the bottom of the screen which you can use to open settings, go to the app store etc.

On the other side Runtipi aims for a much simpler look having only a header with the menu containing Dashboard, Apps, App Store and Settings. The dashboard has 3 widgets, disk usage, RAM usage and CPU usage and unfortunately doesn't offer the ability to add custom widgets.

## App Store

Here the winner is Runtipi since it comes by default with a list of over 200 apps in comparison with Umbrel and Casa OS which only have around 100. However both Umbrel and Casa OS offer the functionality to add extra app stores for more apps, Runtipi doesn't have this functionality, it only allows you to change the app store not add new ones.

Concerning the app updates Runtipi is the winner again since most of the app updates happen automatically using the renovate bot unlike Casa OS and Umbrel where each update has to be done manually.

Here I also have to mention that due to the past of Umbrel, where it was a Bitcoin node, it comes with an extensive list of Bitcoin related apps.

## Additional features

All 3 apps have special features that make them special in some way.

Casa OS offers a built in file browser with support for snapdrop, the ability to add external links to the dashboard, the ability to add your own apps through the UI and customize current ones with a very nice editor, it also allows merging 2 or more disks together into one and lastly it has support for viewing logs and shell access to the host.

Umbrel has very nice support for widgets, it allows shell access to both apps and system and of course viewing the logs, it supports using authentication proxy in front of the app and also exposing them to the "dark web" through tor, it comes with some apps like "Back that Mac up" which are made by them and integrate nicely with the UI, it also has OTA (over the air) updates for easy updating and last but not least its app store is polished very nice with cover images and recommendations making the experience very fun.

Runtipi has also some tricks up its sleeve. It comes with traefik and exposes all apps securely through either your local domain (.local, .home) or some public domain using the HTTP challenge (supports DNS challenge too with some additional configuration) to generate certificates with let's encrypt, it also includes the external links feature allowing you to add other links to the dashboard. Furthermore it includes the log viewing option for both Runtipi itself and apps and lastly it comes with a really nice cli used for starting, restarting, updating etc.

## Developer experience

Since I am a "developer" myself I like checking the code of the apps I use so I can see if I can contribute in the future. My winner here is by far Runtipi since the codebase is very clean and easy to understand how the application works. Next we have Casa OS, it uses GO as the programming language (compared to Runtipi and Umbrel which use Typescript), I don't know enough of the language to really compare it but the code was very clean and again easy to understand how the app works. Lastly we have Umbrel whose the codebase it the worst, the way the app works is by calling bash scripts to do the tasks which is very bad compared to running the command from the runtime itself (for example Runtipi runs the commands using the node child process library).

## Final thoughts

So what should you chose? Well it depends. If you want the most features out there you should definitely go with Casa OS since it is the winner here. If you want app widgets and you want to run bitcoin related things, you should go with Umbrel. Lastly if you want a simple and clean UI with many apps you should use Runtipi. Overall all these apps do the same thing with some small differences it all comes down to the feature set and UI preferences.
