---
title: "Creating and Certifying an OpenID Connect Server"
description: "We recently achieved a major milestone for my project Tinyauth, it's now an OpenID Connect certified server!"
publishedOn: 2026-06-29T19:58:00+00:00
author: Stavros
---

It's been quite a long time since I've been active in the blogging space but recently, I achieved a major milestone for my project [Tinyauth](https://tinyauth.app) that to be honest, I never thought I would reach. The milestone in question is that Tinyauth is finally an OpenID Connect certified server! This has been quite a long journey but the effort I and the Tinyauth contributors put in definitely paid off.

## The importance of Single-Sign-On

I like self-hosting, like a lot. Specifically, I like playing around with all kinds of new self-hosted applications, but this creates an issue, password management.

Nowadays, most, if not all applications utilize some method of authentication. Whether it's a username and a password defined in environment variables or a sign-up flow stored in a database, it exists. However, even with a password manager, I frequently end up with all sorts of random passwords from projects I tried and never ended up using.

The answer to this password mess is SSO (Single-Sign-On) which relies on OAuth and/or OpenID Connect. In simple terms, OAuth is a specification that allows client applications to "offload" their user management to an authentication server. This allows users to have an account in one provider and use it to sign in to multiple clients. You have most likely experienced an OAuth flow when clicking the login with Google/GitHub/Apple buttons as these are implementations of the OAuth specification.

In the same way, a lot of self-hosted apps (at least not the ones that pay-wall it behind the enterprise plan) support the OAuth flow and allow you to use your own OpenID Connect server whether it's some hosted one like Google or your own self-hosted provider.

Unfortunately, while there are some self-hosted identity providers (IdPs), they are oftentimes either resource intensive or complex to set up. This is why I decided to add a tiny OpenID Connect server to Tinyauth.

## Setting the objectives

Before implementing anything, I needed to decide what part of the OpenID Connect specification I was after.

When speaking of the OpenID Connect specification, we don't just refer to one specification but rather an entire group of them. These include the basic implementation, dynamic client registration, discovery and more. It also includes different "underpinnings" that extend an OpenID Connect server.

To start, I decided to only focus on the Basic OP (OpenID Provider) and then build on top of it in the next versions. So, I looked up the specification and started reading. I am generally not a read-the-documentation person, I usually read the documentation only when an issue arises while building. However, for OpenID Connect I wanted to do it right, so I read *most of it*.

I have to admit that while I didn't expect it, the specifications for both OpenID Connect and OAuth are really well structured and easy to go through. They all have links to the referring specifications that allowed me to quickly figure out how each part of an OpenID Connect server worked.

## Creating an MVP

After having read the specification, I started building the thing. While there are already some available Go libraries for creating an OpenID Provider (we will be referring to it as OP), I figured it would be better to do it from scratch in order to understand how an OpenID Connect server actually works. *Because it wouldn't be fair to certify a project based on a library someone else made, right?*

The objective was simple, use the least amount of external libraries needed apart from Gin which is the web framework Tinyauth already uses and the Go implementation of the JOSE standards for the JWKs endpoint. While I could make my own implementation of JWKs (JSON Web Keys), I decided I didn't want to mess with private and public key parsing myself.

A few hours later, I had something ready that at the bare minimum could allow Tinyauth to login with...Tinyauth. After the base server was ready, I discovered that the Conformance Suite of OpenID is actually free to test implementations so, I tested my own implementation and I began finding and fixing bugs. 

Nevertheless after my implementation passed the `oidcc-server` test, I created an initial release. In the following versions of Tinyauth, we fixed more and more bugs and we passed more tests in the suite.

## Diving deep into OpenID Connect

Generally speaking, while most of the things mentioned in the specification were easy to implement, there were some things that bugged me for weeks if not for months. The three most important "issues" I faced were the following:

1. The `sub` claim: In the specification, the `sub` is a claim in the ID token and user-info response that gives a unique identifier to the logged in user. This `sub` must be unique across users and never be re-assigned as RPs (Relying Parties, aka the clients) rely on it to store their own sessions. However, since Tinyauth is a stateless application (the database is only used for sessions) we had to do a compromise and create a deterministic one based on the username and client ID. This approach is not ideal but unfortunately we could not figure out anything better.
2. Authorize POST request: This is a simple note in the OpenID Connect specification that states that OPs must support both GET and POST for their authorize endpoint. Initially, I handled the request parameters in the Vite frontend and sent them to the backend later. But, since Vite is a simple static frontend it cannot handle a POST request. This means that I had to rewrite the entire authorize logic and move it to the backend. With the new approach, the backend consumes the original authorize request (whether it's a GET or a POST) and creates a ticket that the frontend uses to present the consent screen and finally finish the flow.
3. The consent screen itself: As of 2026-06-29 this issue is still something that bugs me. While not significantly annoying (you just have to click "Authorize" every time), it would be nice if it wasn't presented every time. Issue is that I can't justify another database table just for storing if a user clicked "Authorize" or not. If you have any suggestions, please do share them ;)

Apart from the issues mentioned above, with the help of the Tinyauth contributors we managed to finally pass all of the tests in the suite and we were ready to apply for the certification. 

## Getting certified

After about 6 months of work we were ready to apply. We sent an email to the OpenID Foundation team and they waived the fee for us since Tinyauth is a FOSS (free and open-source software) project. 

With the waiver ready, we submitted our application, signed the Docusign and after waiting for around 3 days we received the good news:

> Your OIDC OP certifications are approved and posted at [https://openid.net/certification/certified-openid-providers-profiles/](https://openid.net/certification/certified-openid-providers-profiles/) .

Turns out that the privilege of getting OpenID Connect certified is not something that only multi-billion dollar companies can have. With the help of the amazing Tinyauth community and the OpenID Foundation team, smaller projects like Tinyauth can also earn their place in the certified list!

Oh, and now I can proudly have this in my `README.md`:

<img alt="OpenID Certified" width="200" src="https://openid.net/wordpress-content/uploads/2016/05/oid-l-certification-mark-l-cmyk-150dpi-90mm.jpg" />

Cheers!
