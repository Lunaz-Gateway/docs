---
title: Introduction
description: What Lunaz is, who it is for and where the name comes from.
---

Lunaz is a payment gateway for shielded Zcash. A buyer pays with ZEC, or with USDC, USDT, SOL, ETH or BTC. The funds arrive as shielded ZEC in the merchant's own wallet.

We operate Lunaz as a managed service. You use the hosted dashboard and the API. You do not run any server.

Our servers hold viewing keys only. An incoming viewing key lets Lunaz see incoming payments, but it cannot spend anything. The spending keys stay in your wallet.

## The problem

On a transparent chain, every payment to a merchant is public. A competitor can read the daily revenue, the suppliers and the regular customers of a shop from a block explorer. The buyer's balance and history are exposed to the shop as well.

Shielded Zcash hides these details. Lunaz adds the parts that a shop needs to take payments: an address for each invoice, fast detection, cross-chain payments, webhooks and accounting records.

## Who it is for

- Merchants and marketplaces that want to accept crypto and keep their business data private.
- Buyers who hold assets on other chains and do not want to buy ZEC first.
- Accountants, who still need a complete record. The merchant's viewing key and the CSV export provide it.

## What you get

- A new shielded address for every invoice, with a ZIP-321 payment URI for the QR code.
- Payment detection in seconds, before the transaction is mined.
- Cross-chain payments through NEAR Intents.
- Signed webhooks with a delivery log.
- A CSV export for your accountant.
- A withdraw-to-bank flow through a licensed partner.

All plans include all features. The plans differ only by volume. See [Pricing](../../pricing/).

## The name

The name comes from the Indonesian word *lunas*, which means "paid in full". The "z" is for Zcash. LUNAS is also the success state that a buyer sees when a payment is complete.

## Next steps

- Read [How it works](../how-it-works/).
- Follow the [Quickstart](../../get-started/quickstart/) to create your first invoice.
