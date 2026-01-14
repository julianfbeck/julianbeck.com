---
author: Julian Beck
title: "Building AI-Powered iOS Apps with Cloudflare Workers and OpenAI"
description: "Learn how to build a simple and scalable backend for AI-powered iOS apps using Cloudflare Workers and RevenueCat."
pubDate: 2025-01-03T20:00:00Z
featured: true
draft: false
ogImage: "/media/cloudflare-worker-app-og.png"
tags:
  - cloudflare
  - ios
---

#### Table of Contents

- [](#)
  - [Cloudflare Workers Backend Architecture: Short-Running AI Tasks](#cloudflare-workers-backend-architecture-short-running-ai-tasks)
    - [How to Limit Access to AI Features Based on User Subscriptions](#how-to-limit-access-to-ai-features-based-on-user-subscriptions)
    - [What about Rate Limiting?](#what-about-rate-limiting)
  - [Cloudflare Workers Backend Architecture: Long-Running AI Tasks](#cloudflare-workers-backend-architecture-long-running-ai-tasks)
  - [Conclusion](#conclusion)

#
The demand for AI-powered apps is rapidly increasing. Developers are creating applications such as "Plant Identifier," "Calorie Counter," and image-generation tools leveraging AI models from providers like OpenAI, Replicate, and others.

A common approach might be to directly integrate AI services into the app by calling their APIs. However, this introduces a significant security risk: exposing the API key. Even if secure storage methods like Keychain are used, the API key can still be intercepted through network traffic monitoring tools like mitmproxy or Charles.

To mitigate this risk, a backend service is essential to act as a proxy between the app and the AI service. While SaaS platforms like "AIProxy" can fulfill this role, they often charge on a per-request basis, which can become prohibitively expensive.

A more efficient and cost-effective alternative is to use Cloudflare Workers. These are serverless functions running on Cloudflare's edge network, offering exceptional speed, scalability, and affordability. With Cloudflare Workers, you can build APIs, handle requests, and perform server-side tasks seamlessly.

In this guide, I'll walk you through an architecture for building a simple and scalable backend using Cloudflare Workers. We'll integrate AI capabilities from OpenAI and handle subscriptions through RevenueCat to make sure only paying users can access the AI features as well as implementing Rate Limiting to prevent abuse.

## Cloudflare Workers Backend Architecture: Short-Running AI Tasks

The backend architecture consists of three main components:
- **Cloudflare Worker**: Handles incoming requests, checks subscription status, and forwards AI requests to OpenAI.
- **RevenueCat**: Manages user subscriptions and entitlements.
- **OpenAI**: Provides AI capabilities for text generation, image recognition, and more.

<img src="/media/workers.png" alt="CloudflareWorker" style="max-width: 100%">

The Cloudflare Worker acts as a middleman between the app and the AI service. It checks the user's subscription status with RevenueCat and forwards the request to OpenAI if the user is subscribed. This architecture ensures that only paying users can access the AI features.

### How to Limit Access to AI Features Based on User Subscriptions

When offering AI-powered functionality, it's important to ensure that only users with valid subscriptions can access these features. One way to do this is by integrating with RevenueCat, which simplifies subscription and entitlement checks. Instead of communicating with Apple servers, you can quickly verify subscription status using RevenueCat's API.

Here's a sample TypeScript code snippet showing how to check a user's subscription status with RevenueCat:

```typescript
async function getUserSubscriptionStatus(userId: string, apiToken: string) {
  const url = `https://api.revenuecat.com/v1/subscribers/${userId}`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${apiToken}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    console.log(await response.text(), response.status);
    throw new Error("Failed to fetch user status from RevenueCat");
  }

  const data = (await response.json()) as { subscriber: { entitlements: any } };
  return data.subscriber.entitlements;
}

export { getUserSubscriptionStatus };
```

Provide a valid `userId` and your `apiToken` to verify if the user has an active subscription.

### What about Rate Limiting?

Subscription checks are a great first step to control access to AI features, but they are not enough to prevent abuse. You want to also limit the number of requests a user can make in a given time period or maybe you want to allow a free tier with a limited number of requests without a subscription entitlement. This is where Rate Limiting comes in.

For most of my apps I want two stages of Rate Limiting:

- A free tier with a limited number of requests per day per IP address
- A paid tier with a higher limit of requests per day per UserID

There are multiple ways to implement Rate Limiting in Cloudflare Workers. The easiest would be using a SaaS like `upstash` with its HTTP-based Redis API. This would allow you to store the number of requests made by a user in a Redis database and then check if the user has exceeded the limit. The advantage of `upstash` is that they provide an HTTP-based API for Redis, which allows you to use it in a serverless environment like Cloudflare Workers. However, this approach can get expensive if you have a lot of users making many requests. You could also add an HTTP proxy in front of a Redis database and call the proxy from your Cloudflare Worker. This would allow you to use a self-hosted Redis database and save costs.

Alternatively, you could use Durable Objects, a new feature from Cloudflare Workers that allows you to store stateful data across requests. See the [Build a rate limiter](https://developers.cloudflare.com/durable-objects/examples/build-a-rate-limiter/#:~:text=The%20Durable%20Object%20uses%20a,number%20of%20requests%20per%20second.) for more information on how to implement Rate Limiting using Durable Objects.

## Cloudflare Workers Backend Architecture: Long-Running AI Tasks

For longer-running AI tasks, the synchronous approach might not be suitable due to timeout limits and connection issues. In such cases, an asynchronous approach is more appropriate.

<img src="/media/workers-dual.png" alt="CloudflareWorker" style="max-width: 100%">

Instead of waiting for the AI to complete, your app receives a request ID immediately. The app then periodically checks for results while the AI service processes the request independently. When done, the AI service notifies your worker through a webhook. The app can fetch the result from the worker by polling the worker with the request ID (as shown in the diagram above). For even more long-running tasks, the correct approach would be to use notifications to inform the app that the task is done.

## Conclusion

Cloudflare Workers combined with RevenueCat provide a powerful and simple way to integrate AI capabilities into your iOS app. You don't have to worry about managing servers, configuring domains, or handling complex deployment pipelines.
