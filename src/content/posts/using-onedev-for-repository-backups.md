---
title: "Using OneDev for Repository Backups"
description: "I just discovered this awesome tool called OneDev so let's use it for local repository backups!"
publishedOn: 2024-08-17
updatedOn: 2025-02-02
author: Stavros
---

You probably have seen the recent [GitHub Outage](https://www.theverge.com/2024/8/14/24220685/github-down-website-pull-request) were GitHub was down globally! I was never afraid that I would
lose any data but I thought "What if something happened and some of my repositories were affected?".
I don't have any backups so the thought of losing the code I spent hours or days working on and that I use
as reference to my new projects was a bit scary. So, let's make offline mirrors!

## My issues with Gitea

As you probably know [Gitea](https://gitea.com) is the most popular self-hosted git server but it's definitely not
the best, at least for me. I used to make mirrors with Gitea using [this](https://github.com/varunsridharan/github-gitea-mirror) awesome little script that automated the entire process. The script worked perfectly but I
didn't like Gitea a lot because of 2 things. Firstly, the UI, I am not a fan of the Gitea UI at all. Secondly the actions, I don't like anything about them, apart from having the same format as GitHub actions but except this, everything else is just bad, the actions require a worker on some machine and...THERE IS NO MANUAL WORKFLOW BUTTON! LIKE ARE YOU KIDDING ME? _sigh_ So that's when I started looking about a better alternative and that's when I came across OneDev.

## OneDev

OneDev is just awesome! It can be deployed with one docker run line, it has builtin package registries, CI/CD, kanbans, dashboards and the best thing...an awesome UI that satisfies my ocd. So yes, let’s use OneDev on my raspberry pi 5 for offline repository backups! After looking through the documentation I discovered that it has a Repository Clone step that allows you to clone any repository from any git server. Let’s build our workflow!

## The issue with the Repository Clone

So, when building my workflow to back up the repositories I stumbled across something funny... When you use the Repository Clone step if you don't use the force option it will fail and if you use the force option... it will delete the workflow! So, it's really just deleting itself every time, funny right? Let’s fix it. So, after about 1 hour of work, I came up with this workflow:

```yaml
version: 35
jobs:
  - name: Clone Repo
    steps:
      - !CheckoutStep
        name: Checkout
        cloneCredential: !HttpCredential
          accessTokenSecret: access-token # Make sure you have an access token configured
        withLfs: false
        withSubmodules: true
        condition: ALL_PREVIOUS_STEPS_WERE_SUCCESSFUL
      - !PullRepository
        name: Pull Repo
        remoteUrl: https://github.com/someusername/somerepo # Change to source repo url
        refs: main # Change branch
        withLfs: false
        force: true
        condition: ALL_PREVIOUS_STEPS_WERE_SUCCESSFUL
      - !CommandStep
        name: Restore OneDev Workflow
        runInContainer: true
        image: ubuntu
        interpreter: !DefaultInterpreter
          commands: |
            # Install Git
            apt update
            apt install -y git

            # Configure Git
            git config --global user.name "User" # Change your name
            git config --global user.email "someone@@example.com" # Change your email, make sure to use @@
            git config --global http.sslverify false
            git config --global pull.rebase true

            # Backup workflow
            cp .onedev-buildspec.yml ../workflow.yml

            # Pull
            git pull

            # Restorw workflow
            cp ../workflow.yml .onedev-buildspec.yml

            # Commit Workflow
            git add .onedev-buildspec.yml
            git commit -m "ci: add workflow back"

            # Push
            git push origin main:main
        useTTY: true
        condition: ALL_PREVIOUS_STEPS_WERE_SUCCESSFUL
    triggers: # Delete this section to only run manually
      - !ScheduleTrigger
        cronExpression: 0 15 10 ? * * # Chnage time (right now it is every day at 10:15AM)
    retryCondition: never
    maxRetries: 3
    retryDelay: 30
    timeout: 3600
```

> [!WARNING]
> Make sure to replace the workflow values with your own values.

It is completely different from Github Workflows but it gets the job done. The only issue is that when you run commands and install packages, you have to do everything in one step else everything that's not in your current working directory will be deleted. No problem though, it works perfectly. Let me explain what it does:

- Firstly, we checkout the current code
- Secondly, we use the Clone Repository (which replaces our current repository's contents and deletes our workflow _lol_)
- Thirdly we install git, configure it, backup our current workflow file, pull (resetting the changes), add the workflow back and commit
  And that's it! We just backed up our repository! The workflow will automatically run every day at 10:15AM but you can delete the entire `triggers` section to run it only manually, I use that for some archived repos.

## Conclusion

So overall I am extremely happy with how my workflow turned out and how easy it was to make in OneDev. If you are using Gitea, I blindly recommend you to give OneDev a try and I am sure you will like it! That's it for today...see ya!
