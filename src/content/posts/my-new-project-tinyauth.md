---
title: "My new project, Tinyauth"
description: "I just made Tinyauth, the easiest way to secure your apps with a login screen."
publishedOn: 2025-02-07
author: Stavros
---

First of all, happy new year everyone!

Sooo, I recently created a new project called Tinyauth. Tinyauth is a simple authentication middleware made (mostly) for traefik but I am planning to extend it to other proxies too _it already works with caddy!_ I wanted to share you my journey making this and why I am so hyped about it. So let’s get started!

## Why make Tinyauth

I always wanted some simple authentication for my apps, of course, there is Authentik and Authelia but I consider them way too heavy for my use case. Why do I have to edit 100 config files or use a ton of resources for a simple login page? That’s where Tinyauth comes, it is super lightweight since it’s written in Go and only uses environment variables for configuration. It is also completely stateless requiring no database or persistent storage.

## Understanding how forward auth works

At start forward auth seemed really simple, the basic idea is that the user makes a request to some app, then instead of immediately forwarding the request to the app, the proxy asks the forward auth middleware and expects either a 200 to allow the flow to continue or 400 to block access, traefik and caddy also support a 302 status message to immediately redirect the user to the app. This should be really simple right? Well, not really, it took me some time to figure out how to correctly redirect the user to the login page and back but I eventually figured it out and authentication became easy. Since the app is stateless, everything is handled client side, this means that when the user logins the Gin sessions middleware generates a small cookie containing the user email and an expiration date that’s later send to the client. This unfortunately doesn’t allow the server to invalidate a session but it is the best possible login method that doesn’t require storage which I don’t really want to implement in the app.

## OAuth is easy

I initially thought that it would be super hard to implement but after making a simple Go method to quickly initialize OAuth clients, I just needed to make a robust and extensible provider system that can automatically use the correct provider so as my API never needs to know which provider to use but instead use the same functions and let the providers handle everything. After some rewrites my code worked perfectly and now everything is organized and I can add a new provider with very few lines. Apart from the backend the frontend only needed to store a redirect cookie that will automatically redirect the user to the app once the OAuth provider does the callback. That’s it! OAuth is done!

## Documentation

Documentation was undoubtably the hardest part of this project, I needed to write multiple guides for the different OAuth providers and when dealing with the 50 different screens of Google, documentation quickly becomes a huge pain. Additionally I needed to make sure my documentation is up to date with all the changes I was doing to the configuration and all of the new features I was adding. But, with the help of the awesome framework vitepress, I managed to spin up a beautiful documentation site that’s fast and integrates with the Github CI/CD so I can just commit and everything gets deployed automatically.

## Conclusion

All in all, Tinyauth is my favorite project so far, it makes the authentication space in homelab fast and easy. Feel free to check it out in Github [here](https://github.com/steveiliop56/tinyauth), I also made a [Discord server](https://discord.gg/gWpzrksk) so we can chat about self-hosting and fix your Tinyauth issues. That’s all for now, have fun!
