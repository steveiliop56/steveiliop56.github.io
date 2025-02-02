---
title: "Casa OS vs Umbrel vs Runtipi what should you choose?"
description: "There are a lot of docker management/self-hosting automation tools but what's the best?"
publishedOn: 2024-06-27
updatedOn: 2025-02-02
author: Stavros
---

Sooo, a lot of people like using some sort of automated app deployment platform, so they can easily deploy and update their apps. The user-base can range from experienced users using these apps so as they don't have to manually write the compose files, to complete self-hosting beginners that just want to deploy Immich and Nextcloud. There are many apps that can help you achieve this, but the most popular ones are Runtipi, Casa OS and Umbrel. All the projects are really nice and can help you a lot when deploying your apps, but they have some small differences that may make you prefer one over the other. Let's see what's the best for your homelab.

## Project Maintenance

All projects are actively maintained, but they have some differences in funding/apps/updates.

### Casa OS

Casa OS is built and maintained by Ice Whale Tech which makes the popular SBCs Zimaboard and Zimablade which means that it has full time developers. The development is really active with frequent updates. Their app store is also actively maintained, with automated updates for apps.

### Umbrel

Umbrel is the same as Casa OS, they also sell their own hardware called Umbrel Home which is a N100 based mini-pc with their OS preinstalled. This means that they also have full time developers, but their updates are a bit slower since they focus on making major releases with multiple features. Concerning the app store, it doesn't have an automated way to update apps so everything happens manually through contributions making updates a lot slower.

### Runtipi

Unlike Casa and Umbrel, Runtipi doesn't have any funding apart from the donations made to its developer Nicolas. But this doesn't stop him from releasing multiple updates with fixes for any issues that may occur and new features, of course implementing complex features takes a bit more but it is worth the wait. The app store is very active since Runtipi uses the Renovate Bot to automate updates, so users get updates right after they are released.

## Installation

The installation for both Runtipi and Casa OS happens with an easy one line bash script, that configures everything for you and gets you up and running in less than 5 minutes.

On the other hand in order to install Umbrel, you need to download their ISO image and install it on your computer erasing all previous data which I think isn't really ideal.

All three apps also have Raspberry Pi images alongside with their install script which is a big plus for me.

The initial setup of all the apps is almost the same, as you are asked to create an account and you are ready to go.

## Initial impression

Casa OS and Umbrel have a homepage where you can have app widgets, manage your applications and install new ones through the app store. The whole experience feels like a tablet since you are simply opening the app store and installing apps like you would on a tablet. Umbrel also includes a navigation dock on the bottom of the screen, which you can use to open settings, go to the app store etc.

On the other side Runtipi aims for a much simpler look having only a header with the menu containing simple navigation links for the dashboard, apps, etc. The dashboard has 3 widgets, disk usage, RAM usage and CPU usage and unfortunately doesn't offer the ability to add custom ones.

## App Store

Here the winner is Runtipi since it comes by default with a list of over 200 apps in comparison with Umbrel and Casa OS which only have around 100. However both Umbrel and Casa OS offer the functionality to add extra app stores for more apps. Runtipi doesn't have this functionality, it only allows you to change the app store not add new ones.

Here I also have to mention that due to the past of Umbrel, where it was a Bitcoin node, it comes with an extensive list of Bitcoin related apps.

## Additional features

All three apps have some features that make them special.

### Casa OS

Casa OS offers:

- Filebrowser with support for Samba sharing
- External links to the dashboard
- Add your own apps by importing Docker CLI/Docker compose or filling a form
- Customize app compose through the UI
- Shell access to the host
- Logs (not for apps)
- Disk merging (something like RAID)
- Restart/shutdown buttons

### Umbrel

Umbrel offers:

- Extensive widget support
- Shell access to the host and apps
- Log viewer for both apps and Umbrel
- Authentication for apps
- Expose apps to the TOR network
- Applications that integrate with the UI (Back that Mac up)
- OTA Updates
- Filebrowser
- Restart/shutdown buttons
- Resource monitor

### Runtipi

Runtipi offers:

- Builtin Traefik that exposes your apps security with the HTTP/DNS challenge
- External links in the dashboard
- Guest dashboard for sharing apps without being authenticated
- Log viewer for both apps and Runtipi itself
- Documented API for controlling it without the Dashboard (so apps like [tipimate](https://github.com/steveiliop56/tipimate) exist)
- Really nice CLI for starting/restarting/updating
- Ability to extend both an app's compose file and runtipi's compose file
- The entire app is dockerized and it is self-contained in one directory in the filesystem

## Developer experience

Since I am a "developer" myself, I like checking the codebase of the apps I use, so I can fix potential bugs or add new features. I have worked on the Runtipi codebase and I can't help saying that it is the best compared to Casa OS and Umbrel. This is because the code is clean, well documented and uses the best practices. Next is Casa OS which is written in Go (compared to Runtipi and Umbrel which are written in Typescript), meaning that it is really lightweight and fast. I found it a bit harder to navigate because it uses a different file structure than what I am used to seeing in Go apps but once you understand it, the code is really nice. Finally we have Umbrel which unfortunately doesn't have a very good codebase. The code is messy and uses a lot of libraries for builtin typescript functions, additionally it is mostly frontend as the app deployment is handled with bash scripts which is not ideal for an app like this.

## Conclusion

All in all, all apps have a lot of features and a really active community. If I were to pick the best I would choose Runtipi or Casa OS due to the well written code (less potential bugs) and active community. But on the other hand, if you would like to use Bitcoin related apps or fill your homepage with multiple widgets then Umbrel is your choice. It all comes down to your personal UI preferences and the feature set you like for an app like this.
