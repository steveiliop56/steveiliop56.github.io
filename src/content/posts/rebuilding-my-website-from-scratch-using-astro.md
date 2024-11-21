---
title: "Rebuilding my website from scratch using Astro"
description: "Let me show you how I rewrote my website from the ground up using the Astro web framework!"
publishedOn: 2024-11-21
author: Stavros
---

Sooo, I recently came across a cool framework called [Astro](https://astro.build/). Astro is a web framework designed for statically generated sites like blogs and documentation websites. It's relatively new being just 3 years old but it's widely used by the community so I thought why not give it a try? And now here we are with my website fully powered by Astro!

## Why switch from Hugo?

From the beginning of my blog I wasn't really happy with Hugo, while it's true that it is an extremely fast and powerful static site generator it has some things I don't like. To begin with, while I love the go programming language, I hate go templating. Coming from react, go templating seems way too complicated and messy and I am definitely not willing to learn it. Attached to it I would add that I also didn't really like the file structure of Hugo. All these layouts and partials seem way too complex for me, can I just RTFM and understand how to use them? Yes. Will I? No. Lastly with Hugo it felt like I didn't have the control I wanted over my website, it didn't feel like I built this website, I just took a template and filled it with content and I didn't like that.

## My experience with Astro

Developing my website with Astro was a really fun and interesting experience. I initially wanted to base my website of a default template since I didn't have any experience on how to build blogs, so it was a challenge for me to follow all the best practices but later I decided to build it from scratch because…why not? I am a big [Tailwind CSS](https://tailwindcss.com/) fun because I find it way more organized to have my styles in the appropriate elements instead of having a massive 300 line CSS file. So, I was really happy to see that Astro supported both Tailwind and Typescript out of the box! Apart from all these, writing my blog was relatively easy. I created my base layout files which was super easy since it's just using Html and CSS. Concerning the posts section, Astro handles everything by default, even pagination! I just had to make the posts section and a button that when clicked would go to `/posts/some-number` and that's it! I also really liked the fact that Astro has some cool transition hooks built-in to make your site feel smooth with just one line of code, yes one line! Last but not least, I had to make my main, about and projects pages which was an extremely easy and fast process.

## The hardest part

For me the hardest part was making the comments section. I am using [giscus](https://giscus.app/) which is basically a comments section for static sites based on GitHub discussions. It's really nice and it works amazingly by default. The issue is when you want to make it switch between dark and light themes. The only solution I found to using a custom theme based on user preference was to render the comments section after the page has loaded, so we can use the theme from local storage/device preference. After the initial load you need to send a message to the giscus iframe to change the theme. Not the best solution but if it works…don't touch it.

## Conclusion

On balance switching to Astro was a very fun and educational experience. I learned a lot on how to make a website get 100% on the lighthouse report and on how to make a responsive design. If you are interested in making your own blog from scratch I strongly advise you to give Astro a try and trust me, you won’t regret it!
