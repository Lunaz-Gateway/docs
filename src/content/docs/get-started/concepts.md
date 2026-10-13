---
title: Concepts
description: Invoice statuses, confirmations, over and underpayment, expiry and amounts.
---

## Amounts

All amounts are integers in zatoshi (zat). 1 ZEC is 100000000 zat. An invoice amount must be from 1 to 2100000000000000 zat.

The accountant CSV export is the exception. It shows ZEC amounts as exact decimal strings with 8 digits.

## Invoice lifecycle

An invoice has one of five statuses.

| Status | Meaning | Final |
| --- | --- | --- |
| `pending` | The invoice exists and no payment is seen yet. | No |
| `detected` | A payment is seen in the mempool or in a mined block. | No |
| `paid` | The mined payments add up to at least the invoice amount. | Yes |
| `underpaid` | A mined payment exists, the sum is below the amount, and the invoice expired. | Yes |
| `expired` | The invoice expired with no payment that counts. | Yes |

The normal path is `pending`, then `detected`, then `paid`.

A final status can still change. A late top-up that brings the total to the amount turns `underpaid` or `expired` into `paid`.

## Confirmation

An invoice is `paid` after one confirmation. A confirmation takes about 75 seconds. A payment that Lunaz sees in the mempool is `detected` in seconds.

Lunaz does not handle chain reorgs. See [Limitations](../../help/limitations/).

## Overpayment and underpayment

Payments to one address add up. A buyer can pay the difference before the invoice expires.

- `overpaid_zat` is the received amount minus the invoice amount, or 0. You refund an excess yourself.
- If the invoice expires with a mined payment that is too small, the status is `underpaid`. You refund the buyer yourself.

Lunaz cannot refund a payment because it cannot spend.

## Expiry

You set the lifetime of an invoice with `expires_in_secs`. The default is 900 seconds. Lunaz limits the value to the range 60 to 86400 seconds.

An invoice that is `detected` from the mempool only, and has been expired for more than 1 hour, becomes `expired`. The transaction was probably dropped.

If a cross-chain swap is active and the invoice expires within 10 minutes, Lunaz extends the expiry to 30 minutes from the swap request. This gives the swap time to finish.

## API access

| Access | Endpoints |
| --- | --- |
| API key | Create an invoice. |
| Public, by invoice ID | Read an invoice, WebSocket status, swap assets, start a swap. |

Everything else, such as your account, webhooks, export and withdrawals, is in the dashboard. See [Authentication](../../api/authentication/).
