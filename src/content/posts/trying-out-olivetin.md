---
title: "Trying out Olivetin"
description: "I just discovered this awesome tool called Olivetin and it helped me automate my life."
publishedOn: 2024-07-04
author: Stavros
---

Sooo I host a minecraft server for me and my friends using Lodestone and then using ssh tunneling I expose it to the internet, my problem is that running the ssh command every time is annoying but at the same time I don't want to have my minecraft server exposed to the internet all day. Furthermore I wanted to play with a new self-hosted tool and that's when I discovered Olivetin, an app that does exactly this, predefined commands from a web UI.

## Installation

The installation was very simple and straight forward, Olivetin offers literally every possible installation method including rpm and deb packages, docker containers, Kubernetes and of course building from source. I personally used docker compose to test the app and then proceeded to add it to Runtipi and continue using it this way.

## Writing my own theme

The first thing I did was to find a way to use another theme because to be honest the default theme is meh. Luckily Olivetin has support for writing your own CSS theme and it even has some default themes. I didn't like the defaults so I decided to write my own and after 5 hours and 300 lines of CSS my theme was ready and I loved it. Later I opened a pull request to Olivetin to add my theme and now I can present you [ButtonBox](https://www.olivetin.app/themes/posts/buttonbox) a clean, modern and stylish dark mode theme (no white mode here).

## Features

I was honestly impressed with how many features this app has. To begin with it allows you to add arguments to your buttons, for example ask for confirmation, some value or selecting something from a list than gets passed to the command, awesome! When an action gets executed it stores the output so you can later view the logs from the web UI, it also allows you to dynamically see the output of a command while it gets executed! Last but not least it allows you to have multiple pages with different buttons and even folders and it has countless integrations including ping and docker support!

## Community

The developer behind the app is an awesome guy interested in adding new features and making the app awesome, another cool thing is the response time, when I asked a question in Discord I got a response in minutes!

## Conclusion

This app definitely deserves a place in my homelab and I am really happy with how it integrates with the rest of my workflow. Check it out [here](https://www.olivetin.app) and if you like it give it a [star](https://github.com/OliveTin/OliveTin).
