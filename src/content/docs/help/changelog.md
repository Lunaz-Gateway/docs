---
title: Changelog
description: Changes to Lunaz and to this documentation.
---

## 2026-10-18

New accounts have limits on payment volume, mostly on cross-chain payments. The limits rise automatically as the account builds a history, and the dashboard shows them. Over a limit, the API returns 403 with the code `limit_exceeded`. See [Errors](../../api/errors/#account-limits).

## 2026-10-14

Pricing: monthly plans are replaced by a 0.5% fee inside each shielded payment and a 0.75% app fee on cross-chain swaps (the 0.5% fee plus 0.25%). See [Pricing](../../pricing/).

Webhook signatures now include a timestamp, and every event has an id. Update your verification code. See [Webhooks](../../guides/webhooks/#verify-the-signature).

## 2026-10-13

Lunaz now asks for an incoming viewing key. Full viewing keys are reduced to their incoming part.

Sign-in uses an email code. Passwords were removed.

First public docs.
