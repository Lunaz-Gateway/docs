---
title: Limitations
description: Known limits of the current version of Lunaz.
---

This list describes the current version.

## Payments

- Chain reorgs are not handled.
- A swap needs an invoice of approximately 0.001 ZEC (100000 zat) or more.
- A swap can deliver a little more or less ZEC than the invoice. Lunaz cannot refund an underpayment. You refund any excess or shortfall.
- The origin-chain leg of a cross-chain payment is public.

## Accounts

- You cannot change the viewing key after you set it.
- In-browser wallet generation is not available yet. Bring your own wallet and incoming viewing key.

## Billing

- Some wallets may not support payment requests with two recipients yet. If a wallet pays only the merchant part, the invoice is still paid, and Lunaz bills the missing fee to the merchant later.

## Withdraw to bank

- Withdrawal to a bank is not available in every region yet.
- The received total on the Withdraw page counts payments that Lunaz detected. It is not the balance of your wallet.
- A withdrawal to a bank is not private. The deposit address is transparent.

## Webhooks

- An event is tried 3 times. After that it stays failed until you retry it from the dashboard.
- Use the Failed tab on the webhooks page to find failed events.
