---
title: "Hugo vs Jekyll vs Ghost what should you chose?"
description: "There are a lot of blog-building engines and frameworks out there but what should you choose?"
publishedOn: 2024-09-09
author: Stavros
---

So, I recently started a blog (you probably noticed) and I was using Ghost in the beginning but I later switched to Hugo, a static website generator, but why? And what's best for your own blog? Let's dive into it...

## Why did I switch?

So Ghost was a quite "expensive" option for my tiny blog, by this I mean that in order to run Ghost you need a database and the Ghost app itself running on a docker host.
At the time my router didn't have port forwarding enabled, (due to some ISP configurations) so my only option was Cloudflare Tunnels. It seemed to work fine in the beginning but then it got terribly slow, like 4-6 seconds to load the website which was massive for a tiny blog like mine.
Furthermore in August I went on holidays and unfortunately I had to power off my server where the website was hosted. I could move to a VPS but for a website this small it's a bit stupid to do so. For these 15 days I was on holidays and my website had the maintenance page, I of course lost all visitors and got removed from Google search results which was terrible.
The plan was to move to something that could be hosted on Github pages or something similar and that's why I switched to Hugo.

## Ghost

As I mentioned above Ghost was my first blogging platform, it's really a full blogging platform with a sleek UI and everything you could ever need for your blog, it is also designed for handling a lot of audiences and it has support for newsletters, member exclusive posts etc.

#### Pros

- Very sleek UI
- Support for members and member only posts
- Support for newsletter
- Very user-friendly and easy to customize
- Optimized for a big audience

#### Cons

- Requires an email server
- You cannot convert posts back to markdown (without an external tool)
- Requires a VPS or your own server to run since it needs a container platform like docker
- It has the least stars on Github

## Hugo

Hugo is what powers my current website, it is very expensive but of course it has its drawbacks too.

#### Pros

- Crazy fast
- The most starred blogging platform on Github
- It can be hosted on Github pages or any CI/CD that supports deploying a website
- Single file configuration for the entire website
- A ton of themes including not only blog related ones
- Single binary file to create and compile the whole website

#### Cons

- It uses Go templates to create or customize themes which is hard to understand
- The file structure can be confusing to new users
- Can be tricky to extend

## Jekyll

Jekyll is another static site generator written in Ruby, the main reason for its popularity is the ability to extend it using plugins and that the fact that it's using liquid templates.

#### Pros

- Can be easily extended through the use of plugins
- Uses liquid templates which are easier to understand
- Older and bigger community
- It can be hosted on Github pages or any CI/CD that supports deploying a website
- Single file configuration for the entire website

#### Cons

- Binary not provided, you need to install Ruby to use it
- Less supported content types (compared to Hugo)
- Requires a lot of plugins for almost everything (compared to Hugo which comes with a lot out of the box)

## Should you use a static site generator?

The most famous question among these projects is whether you should use a static site generator like Jekyll or Hugo, or use a full blogging platform like Ghost. I believe it all comes down to the audience and blog type, for your personal blog that may be getting 50-100 visitors (or even more) per month a static site generator is for you. Attached to this I would add that Hugo and Jekyll can be also used as information pages compared to Ghost which can't. Now on the other hand, if you have a blog with 1000+ monthly visitors, Ghost is for you due to its ability to manage big blogs and handle comments very well.

## Conclusion

All in all, these 3 platforms are extremely powerful and guarantee that you will have a great experience making your blog, it all comes down to your audience, post writing preference (using a GUI or your terminal/code editor) and language skills (go/ruby/none). I would personally recommend Hugo if you want a static site generator and just want to use and theme and forget about it, Jekyll if you know Ruby and/or want to extend your site a lot and Ghost for beginners. The thing is, it doesn't matter what you will use when starting out, just pick what you like the best and start writing!
