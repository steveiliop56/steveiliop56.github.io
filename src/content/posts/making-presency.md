---
title: "Making presency"
description: "I made presency, a simple why to customize the Discord Rich Presence because...why not?"
publishedOn: 2024-10-12
author: Stavros
---

Sooo, Discord has a really cool feature called Rich Presence, this allows Discord to show your friends the current game you are playing or your current activity etc. Some projects like [vscord](https://github.com/leonardssh/vscord) that use this Rich Presence API to display what projects you are currently working on. So, I decided to make my own little helper app that allows you to set any status you want in Rich Presence because….it’s cool and why not?

## Electron is bad

My first Google search was “how to make a GUI app with TypeScript”, the first link was Electron _should have never clicked that_. In the beginning it looked cool, a framework that allows you to make cross platform desktop apps with frameworks like React. I was quite impressed so I started playing around with it. I immediately found out that I had to use another app called Electron Forge which is specifically built for TypeScript support. So, I created an app using their script, installed some dependencies _a whole lot of dependencies_ and started developing. The developing experience wasn’t bad since I was using React and Vite so everything looked familiar. After making my UI, I decided to try and build the app to test if it works as expected on Windows. I run the command and…it failed. Apparently I needed to install both Mono and Wine for this to compile the app, after installing 2GB worth of dependencies that I won’t use ever again, I tried the command again and guess what? It failed, saying something about no such file or directory in some `/tmp` path. I tried debugging it but no luck, so I did the same thing that a developer like me would do, I `rm -rf` the entire directory and started looking for another way to make GUI apps.

## Wails is amazing

Since I had no luck with making a GUI with TypeScript based solutions, I started looking for a framework written in my next favorite language, Golang. After some research I found an impressive amount of frameworks but Wails seemed the best _and it actually was the best_, so I chose that. The installation was extremely easy, I just installed their CLI with Go and run the create app command. After this, I run their awesome `wails doctor` command which automatically detected and installed the missing dependencies which where **_far_** less than what electron required and since it is based in Go, no need for things like Wine because Go compiles natively.

## The developer experience with Wails

A very important feature all frameworks should have is a developer experience that doesn’t suck and Wails has this feature. To begin with it uses React and Vite for frontend with TypeScript app creation built-in, so all the frontend part was extremely easy since I could install my favorite libraries and frameworks like React Hook Forms and Tailwind. Additionally an awesome feature Wails has is that it doesn’t try to integrate Go in the React part but instead separates them in a way that is type safe and automatic. By this I mean that when you write your Go functions handling the backend, you write them like this:

```go
func (a *App) Hello(name string) (string) {
    return fmt.Sprintf("Hello %s!", name)
}
```

And in turn Wails automatically adds a new function in JavaScript:

```javascript
export function Hello(arg1) {
  return window["go"]["main"]["App"]["Hello"](arg1);
}
```

And its types in TypeScript:

```typescript
export function Hello(arg1: string): Promise<void>;
```

In this way you can import all your Go backend functions in your frontend and use them like this:

```typescript
import { Hello } from "../wailsjs/go/main/App";

export const function HelloText() {
  return <h1>{Hello("Stavros")}</h1>
}
```

I find this extremely simple and amazing to work with. The only inconvenience I had was that for some reason it gave my Zod object as a map in the Go function but it was easily solvable but not that type safe since I had to use `type Form map[string]string` for the type.

## Writing Presency

Writing Presency was fairly simple as it’s not a complex project, so most of my time was spent in the CSS to ensure the UI looked as close to the Discord UI as possible. In the beginning I didn’t plan to make the project public but I think it would be nice to demonstrate how awesome Wails is and also make a fun Discord Helper app. The project is available on my GitHub [here](https://github.com/steveiliop56/presency).

## Presency Limitations

Due to how the Rich Presence API works in order to use custom images you need to create an app in the Discord Developer Portal [here](https://discord.com/developers/applications) and upload all your icons under the Rich Presence - Art Assets section. Then just copy your Client ID from the OAuth2 section and paste it in the app. Another tiny limitation Presency has is that it doesn’t have an option to add a button _you know, the Join button_ but I may _or may not_ add it in the future.

## Conclusion

Making Presency was a really cool experience for me since I got to learn how to make cool GUI apps with my favorite programing languages. Additionally now I can set my Rich Presence to whatever I want which is a bit funny. Was it worth the 3 hours I spent? Hell no. Do I find it cool? Hell yeah!
