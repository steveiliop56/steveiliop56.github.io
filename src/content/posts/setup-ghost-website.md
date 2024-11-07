---
title: "How to set up a Ghost website"
description: "Let me show you how to set up a Ghost website like mine!"
publishedOn: 2024-06-29
author: Stavros
---

My website is a fun little project I made hosted on my homelab, but let's see how you can setup your own ghost website for almost free too!

## Requirements

In order to make your own public blog you will need the following requirements:

- A domain name
- A Cloudflare account
- A Gmail/Mailgun/Amazon account (depending on what mail server you want to use)
- Some kind of server or virtual machine to host the website

> I am using Proxmox for my hypervisor, if you are using Proxmox too you can host ghost in an LXC container instead of a virtual machine.

## Before you begin

Before exposing your ghost server to the internet I would recommend installing and enabling unattended upgrades to make sure your server will be secure, I would also recommend you setup the server in a VLAN if it is possible for even better security.

## Setting up your email server

If you are planning to use Gmail for the email server you can skip this step, but if you want to use Amazon SES or Mailgun you will need to setup some DNS records and probably some other settings. You can check their documentation on how to do it.

## Setting up ghost

The ghost setup is very easy and straight forward, all you need is a server/virtual machine/LXC container that can run docker. Then you can simply run this docker compose file to get ghost up and running:

```yaml
version: "3.9"
services:
  ghost:
    container_name: ghost
    image: ghost:5.86.2
    restart: always
    ports:
      - 80:2368
    environment:
      database__client: mysql
      database__connection__host: ghost-db
      database__connection__user: root
      database__connection__password: somesupersecurepassword
      database__connection__database: ghost
      mail__transport: SMTP
      mail__options__host: amazonsmtpserver
      mail__options__port: 465
      mail__options__service: SES
      mail__options__auth__user: amazonsesuser
      mail__options__auth__pass: amazonsespassword
      mail__from: "'Somebody' <noreply@mywebsite.com>"
      url: https://mywebsite.com
    volumes:
      - ./data/content:/var/lib/ghost/content

  ghost-db:
    container_name: ghost-db
    image: mariadb:11.4.2
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: supersecurepassword
    volumes:
      - ./data/database:/var/lib/mysql
```

> Here you can see I am using `mariadb` for the database but you can use `mysql` too, I just had issue pulling the image.

> At the time of writing the versions in the docker compose are the latest, before deploying I would recommend checking docker hub for newer versions so you can start with the newest version immediately.

Here you only need to replace the root password of your database, the `mail__from` environment variable and the `url` variable. If you prefer to use another service for emails instead of Amazon SES you can check the configuration page [here](https://ghost.org/docs/config/#mail). I would recommend against using Gmail since the emails ghost will send will come from a gmail.com address while with Mailgun or Amazon SES they will look like they will be coming from your domain.

After you make your changes you can start ghost with the command `docker compose up -d` and then you should be able to access ghost in your configured URL, right now we don't have the domain configured so you can simply access ghost by the IP address of your server.

## Setting up watch tower

Since we want to handle updates automatically we can can use watchtower to automatically update our docker containers to the latest version. The watchtower compose file is very simple and you don't need to modify anything.

```yaml
version: "3.9"
services:
  watchtower:
    container_name: watchtower
    image: containrrr/watchtower
    restart: always
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
```

> By default watchtower will update every container but you can use the configuration file to configure it as you like. [Here](https://containrrr.dev/watchtower) is the documentation for it.

After you finish modifying your docker compose file you can start watchtower using `docker compose up -d`.

## Setting up Cloudflare Tunnels

Since we don't want to just punch holes in our router's firewall we are going to use Cloudflare Tunnels to securely expose our application to the internet. In order to do that you can go to the Zero Trust dashboard then Networks and lastly Tunnels. There you will need to click Create tunnel, and select Cloudflared. Then you will need to set a name for your tunnel. On the Install and run connectors page you need to select docker and copy the command. It will look something like this:

```bash
docker run cloudflare/cloudflared:latest tunnel --no-autoupdate run --token somereallbigtoken
```

From this command you only need this big token and use it in this compose file here:

```yaml
version: "3.9"
services:
  cloudflared:
    container_name: cloudflared
    image: cloudflare/cloudflared:2024.6.1
    restart: unless-stopped
    command: tunnel --no-autoupdate run --token pasteyourtokenhere
    extra_hosts:
      - host.docker.internal:host-gateway
```

> Again here I am using the latest version that exists in the time of writing, please check for newer versions on docker hub and use the latest one.

Now run `docker compose up -d` and your connector should pop up in the Cloudflare dashboard, there you can select it and in the next section select your domain from the dropdown and add a subdomain/suffix if you like, for type select HTTP and for URL use `host.docker.internal`. Lastly click save and congratulations! Your site should be up and running in your domain name!

## Next steps

If you want your site to get more viewers I would recommend adding it to Google Search Console so as it can get indexed in Google and you will be able to see status about the visitors etc.

## Conclusion

By now you should have a ghost site running in your website so you can start documenting your homelab adventures just like me. Happy blogging!
