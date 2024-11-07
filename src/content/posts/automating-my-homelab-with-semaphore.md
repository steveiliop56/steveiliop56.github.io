---
title: "Automating my homelab with semaphore"
description: "Let me show you how I automated my entire homelab using ansible and semaphore."
publishedOn: 2024-07-17
author: Stavros
---

My homelab has a very big problem, I never update it, like never, except if it's absolutely necessary to. I wanted to solve this problem since being a couple of kernel versions behind in my Proxmox server wasn't really ideal. Let's see how I managed to automate updating everything through a simple web UI.

## Trying to reinvent the wheel

While I know Ansible and I could have used it in the first place I decided it would be fun to reinvent the wheel and make my own update checking tool called puck. Puck standing for (Package Update Checking Kit) is a simple cli tool written in Go. I made it so you can easily specify all your servers in a yaml config and by running one command you get which servers need updates, it doesn't update them though. After being roasted on reddit, I understood that I indeed was trying to reinvent the wheel and make it worse, who wants to just check for updates and not update the system? It's Linux not windows. So I decided that it was time to fix my mistake and use ansible.

## The problem with vanilla Ansible

Ansible is very powerful and very easy for automating literally everything, the only "problem" is that in some cases I don't want to run the playbook manually through a terminal, that's boring. Sure I could setup a simple LXC container and run Ansible with a simple cronjob but that's just boring. Is there a better solution? Of course there is and it's called Semaphore!

## Semaphore UI

Semaphore is an awesome little tool designed to help run your ansible playbooks doing daily tasks (like updating) with one click from a nice web UI. It also runs in docker! So let's deploy it! Since it runs with docker we need a docker compose file. Here is a very simple one I made which also runs postgres as the database:

```yaml
version: "3.9"
services:
  semaphore:
    container_name: semaphore
    image: semaphoreui/semaphore:v2.19.10
    restart: unless-stopped
    volumes:
      - ./data/repositories:/repositories
    environment:
      - SEMAPHORE_DB_USER=semaphore
      - SEMAPHORE_DB_PASS=somereallysecurepassword
      - SEMAPHORE_DB_HOST=semaphore-db
      - SEMAPHORE_DB_PORT=5432
      - SEMAPHORE_DB_DIALECT=postgres
      - SEMAPHORE_DB=semaphore
      - SEMAPHORE_PLAYBOOK_PATH=/tmp/semaphore
      - SEMAPHORE_ADMIN_PASSWORD=somereallysecurepasswordagain
      - SEMAPHORE_ADMIN_NAME=somebody
      - SEMAPHORE_ADMIN_EMAIL=somebody@example.com
      - SEMAPHORE_ADMIN=somebody
      - SEMAPHORE_ACCESS_KEY_ENCRYPTION=somethingreallysecure
      - SEMAPHORE_LDAP_ACTIVATED=no
      - TZ=SomeTimezone
    ports:
      - 3000:3000

  semaphore-db:
    container_name: semaphore-db
    image: postgres:14
    restart: unless-stopped
    volumes:
      - ./data/db:/var/lib/postgresql/data
    environment:
      - POSTGRES_USER=semaphore
      - POSTGRES_PASSWORD=somereallysecurepassword
      - POSTGRES_DB=semaphore
```

> At the time of writing the image versions are the latest ones, make sure to replace the versions with the newest ones when running the docker compose file. You don't need to change the postgres version.

> Make sure to replace the passwords and the encryption keys throughout the compose file with something secure especially if you are planning to use this compose file in a production environment.

> Semaphore is available on the Runtipi Appstore too, so if you use Runtipi you can simply install it directly from there.

So now we are ready to launch! `docker compose up -d` and Semaphore should be listening in port 3000.

## Configuration

Now its time to do some basic configuration to semaphore, the initial setup. When you visit Semaphore for the first tune it will ask you to sign in and create a project, I named mine `homelab`, when you finish you should be presented with the Semaphore UI.

Firstly I set up my ssh credentials, this is very easy to do just click on the Key Store tab and add your ssh keys or login credentials. After that I added my inventory files, again head over to the Inventory tab and add all your inventory files, when you add a new inventory you have to specify your ssh credentials which we set up earlier. The inventory file is just like the ansible one so you can specify all the variables you are familiar with like `ansible_become_password` which I used a lot. Time for our repository, Semaphore works with git repositories by default but it allows you to use folders too, in the compose file I showed you above I added a `/repositories` bind volume where you can place your playbooks without the need to use git, I prefer this option because sometimes playbooks can include sensitive information like passwords and tokens. Additionally we need to set up the environment, that's very simple I simply created a new environment and added a new variable with key `ANSIBLE_HOST_KEY_CHECKING` and value `false` to disable host key checking else my playbooks would fail. Last but not least we need to create a task, a task is basically all of the above steps combined so the playbook can run, you simply need to go to the Tasks tab create a new task and fill in the values, all the important ones are dropdowns where you just select what you created from the previous steps.

When you are done you can click the task you just created and click run a terminal will pop up where you can see the output live but you can also close it and the task will continue in the background.

## My most used playbook

I think its not hard to guess what my most used playbook is, it's of course the updating one. So I just created a dead simple ansible playbook:

```yaml
- name: Update hosts
  hosts: all
  become: true

  tasks:
    - name: Update and upgrade
      apt:
        update_cache: yes
        upgrade: full
        autoclean: true
        autoremove: true
        clean: true
```

> As you can see I used `hosts: all` to make the workflow work on every inventory file I use in my task.

That wasn't enough though, triggering it manually is boring so I just went to the Schedule tab and created a simple task to run my playbook every Monday at 8 p.m.

But that's still not enough! We need notifications right? Of course we need notifications, discord notifications! Discord notifications are super easy you just need to go your discord server, create a new channel, open the settings and go to the integrations tab. There you can create a new webhook and copy the URL. Your URL will look something like this: `https://discord.com/api/webhooks/somelongstring/someotherlongstring` where `somelongstring` is your webhook id and `someotherlongstring` is your webhook token, keep note of that. Now we simply add a new task to our playbook to notify us when our servers are done updating. Here is my full playbook:

```yaml
- name: Update hosts
  hosts: all
  become: true

  tasks:
    - name: Update and upgrade
      apt:
        update_cache: yes
        upgrade: full
        autoclean: true
        autoremove: true
        clean: true

    - name: Send notification to discord
      community.general.discord:
        webhook_id: webhook id
        webhook_token: webhook token
        username: Semaphore
        content: ✅ Server {{ inventory_hostname }} up to date!
```

In this playbook just change the webhook id and webhook token to what you got above from discord. The `{{ inventory_hostname }}` part will send you a notification with the IP/hostname of each server in your inventory file. And that's it! That's how I automated my homelab!

## Conclusion

From now on my servers will be up to date and I will receive notifications on discord about my updates! That's super awesome! And that's just the beginning of my automation journey with ansible...
