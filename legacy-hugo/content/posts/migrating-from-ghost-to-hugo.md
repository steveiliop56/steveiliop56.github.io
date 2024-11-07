+++
title = 'Migrating my blog from ghost to hugo'
date = 2024-08-12
draft = false
+++

So, you probably saw that my website changed a lot and that’s because I decided to switch my production website from ghost on premises
to Hugo on GitHub pages and I believe that was a really good decision. Let’s discuss why I did and why.

## Why did I switch?

For the last 2 weeks I had to go on holidays and unfortunately had to shutdown my main server running ghost, which means downtime and downtime is bad
because google deindexes the website from search results. So, I decided to switch to a cloud provider to not have any downtime, but moving a
ghost website and a MySQL database on the cloud would be expensive and pointless. Ghost is made for bigger blogs with multiple subscribers not
for my tiny personal blog so hosting in on the cloud would be not free and pointless. Additionally, I don’t need features like comments and
newsletters and I wanted to learn something new so let’s switch my blog to Hugo and make it integrate with GitHub pages and auto deployments
with GitHub actions.

## Getting started with Hugo

Getting started was relatively easy, I downloaded the Hugo binary and created a new website, then chose a theme and started adding content.
The theme of my choice was PaperMod which you can see [here](https://github.com/adityatelange/hugo-PaperMod), I really liked it because it’s fast,
responsive and well documented. Adding it was really easy, I just had to add a git submodule, configure it and that’s it! My site was ready!

## Migrating my data from Ghost

The hardest part of moving to Hugo was migrating the data from Ghost and that’s because when you edit a Ghost post you can use markdown normally but
when you write it, it’s done, you cannot export it back to a markdown file so I had to copy everything as plain text and then add the markdown
specific things like the hashtags `##` for titles and these things ``` ` ``` for code. Now all my blog posts are in markdown licensed under then
GPL-3.0 license stored on my GitHub repository which you can find [here](https://github.com/steveiliop56/steveiliop56.github.io), this repository
also contains my configuration for Hugo.

## The disadvantages of Hugo and the theme I chose

While I am really happy with Hugo and PaperMod, I didn’t like 2 things. Firstly due to Hugo being entirely markdown I couldn’t make these nice
information boxes like in ghost and I had to resort to using the quote method `>` of markdown. Secondly with PaperMod I didn’t like the menu
on mobile, the menu buttons are simply bellow the title and it doesn’t look good, I would prefer an option to use a hamburger menu. 

## Wrting a GitHub workflow to automatically deploy my website on github pages

One major thing I wanted to do with Hugo was to automated the deployment of the website on every commit because who wants to build the website
manually? The workflow was really easy to set up and that's because Hugo provides a ready to go workflow which I just copy pasted and everything
worked perfectly. That didn't stop me for making my own workflow in my personal [OneDev](https://onedev.io/) instance so I can test locally.

## Conclusion

Overall I am really happy with my new blog and that I managed to integrate it well with GitHub pages so I don’t have downtime. If you have any
recommendations or issues with my blog you can open an issue on my GitHub repository [here](https://github.com/steveiliop56/steveiliop56.github.io),
there you can also give me some feedback if you lie the new look compared to the old one because you know…I still have backups of ghost ;).
