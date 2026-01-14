---
author: Julian Beck
title: "Stripe Client Side Donation Button With React"
description: "Stripe Client Side Donation Button With React"
pubDate: 2022-03-16T15:22:00Z
featured: false
draft: false
tags:
  - Web
---


I wanted to add a Donation Button to my React Website https://localpdf.tech. Stripes Client-Only-Checkout is perfect for that, beacause you don't need a server.

![Donation Button using React Stripe and Tailwind](https://cdn-images-1.medium.com/max/2000/1*9zUFQ2ZxLyfiJ84kW2n-9Q.png)*Donation Button using React Stripe and Tailwind*

## Enable Stripe Client only Integration

First, you need to add a Test-Product to Stripe. Make sure you activate **Viewing Test Data:**

![](https://cdn-images-1.medium.com/max/2000/0*XYfBVFkl3jUAyhaX.png)

After that create a simple Test-Product to test our Donation button later on. After you have created the Product we can enable the Client-Only integration. Goto **Settings > Checkout settings** and enable the **client-only integration**.

![](https://cdn-images-1.medium.com/max/2000/0*B3YHCaIrpPf__g_Y.png)

Next enter the Domain for your Website so it can be used in the live mode. In my case it is **localpdf.tech.**

![](https://cdn-images-1.medium.com/max/2000/0*q0xWkna7u44DiYNB.png)

Now you are set for the Stripe side and we can start building the React Donation Button.

## React Donation Button

To use Stripe, install the Stripe NPM package:
```
npm install @stripe/stripe-js
```

After that, get your **Publishable Key** and init the Stripe library using it:
```javaScript
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(
      "pk_test_51IUqMCJ2iOysJZvP3vrQpEoV2l1SpF9PzkycqVdKjmC3RYuDC3AqTvRfBDcsDwDmtxJlkUyip4GQOb8Akt0lF3O100RSHVPfch"
    );
```
To start a Checkout using the Client-Only Integration you need to call redirectToCheckout:
```javaScript
const stripe = await stripePromise;
stripe
  .redirectToCheckout({
    lineItems: [{ price: itemID, quantity: 1 }],
    mode: "payment",
    successUrl: window.location.protocol + "//localpdf.tech/merge",
    cancelUrl: window.location.protocol + "//localpdf.tech/merge",
    submitType: "donate",
  })
  .then(function (result) {
    if (result.error) {
      console.log(result);
    }
  });
```
Set the price to the ProductID of the created Test-Product on the Stripe-Dashboard. Next set the successUrl and cancelUrl to your desiered location. You can set the submitType too auto if you don't want the payment to be a Donation.

Here is the complete code for a React Donation Button:
```javaScript
import React from "react";
import "./styles.css";
import "./styles/tailwind-pre-build.css";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(
  "pk_test_51IUqMCJ2iOysJZvP3vrQpEoV2l1SpF9PzkycqVdKjmC3RYuDC3AqTvRfBDcsDwDmtxJlkUyip4GQOb8Akt0lF3O100RSHVPfch"
);
const DonationButton = ({ itemID, ammount }) => {
  const handleClick = async (event) => {
    const stripe = await stripePromise;
    stripe
      .redirectToCheckout({
        lineItems: [{ price: itemID, quantity: 1 }],
        mode: "payment",
        successUrl: window.location.protocol + "//localpdf.tech/merge",
        cancelUrl: window.location.protocol + "//localpdf.tech/merge",
        submitType: "donate",
      })
      .then(function (result) {
        if (result.error) {
          console.log(result);
        }
      });
  };
  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
      onClick={handleClick}
    >
      Donate {ammount}$
    </button>
  );
};
export default function App() {
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <DonationButton
          ammount={"5.00"}
          itemID="price_1IUx1FJ2iOysJZvP1LD3EzTR"
        ></DonationButton>
      </div>
    </>
  );
}
```
