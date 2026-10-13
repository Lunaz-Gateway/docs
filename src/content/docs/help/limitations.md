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

- There is no password reset.
- You cannot change the viewing key after you set it.
- In-browser wallet generation is not available yet. Bring your own wallet and viewing key.

## Billing

- Plan renewals are manual. There is no recurring payment in ZEC.
- Prices and limits are a first version.

## Withdraw to bank

- The flow uses a mock partner. The TransFi integration is not available yet.
- The mock deposit address is not a valid Zcash address, so no wallet can send funds to it.
- The received total on the Withdraw page counts payments that Lunaz detected. It is not the balance of your wallet.
- A withdrawal to a bank is not private. The deposit address is transparent.

## Webhooks

- Retries are kept in memory. A service restart clears pending retries.
- Use the delivery log to find failed deliveries.
