---
title: Webhooks
description: Receive and verify webhook events from Lunaz.
---

Lunaz sends a signed POST request to your endpoint when an invoice, swap, withdrawal or plan changes. You set the endpoint URL and read the signing secret on the webhooks page of the dashboard. See the [Webhooks guide](../../guides/webhooks/) for the setup steps.

## Request

Each request has these headers.

| Header | Value |
| --- | --- |
| `Content-Type` | `application/json` |
| `X-Lunaz-Signature` | Hex HMAC-SHA256 of the raw body. The key is your signing secret. |

## Event types

| Type | When |
| --- | --- |
| `invoice.paid` | The invoice is `paid`. |
| `invoice.underpaid` | The invoice expired with a payment that is too small. |
| `swap.refunded` | The swap was refunded. The invoice stays `pending`. |
| `swap.failed` | A swap failed. The invoice stays `pending`. |
| `swap.incomplete_deposit` | The buyer deposited less than the quoted amount. The invoice stays `pending`. |
| `withdrawal.updated` | The status of a withdrawal changed. |
| `plan.updated` | The plan of your account changed. |
| `test` | You sent a test delivery from the dashboard. |

## Payload

```json title="invoice.paid"
{
  "type": "invoice.paid",
  "invoice_id": "8f14e45f-ceea-4672-9b2d-5c1d0a7e3b11",
  "status": "paid",
  "amount_zat": 5000000,
  "received_zat": 5000000,
  "overpaid_zat": 0,
  "txid": "3b1c0f9e2a7d4c58b6e1a0f3d9c27b845e6a1f0d2c3b4a59687766554433221f",
  "swap": null
}
```

`swap` is `null` when the buyer paid with ZEC. Otherwise it has the `asset`, `blockchain`, `amount_in_formatted` and `status` of the swap. For a `test` event, `invoice_id` is `null`.

```json title="withdrawal.updated"
{
  "type": "withdrawal.updated",
  "invoice_id": null,
  "withdrawal_id": "c2d9a1e4-7b36-4f0a-9e52-0d8b1a6c3f77",
  "status": "payout_processing",
  "amount_zat": 100000000,
  "fiat_currency": "IDR",
  "fiat_amount": "1572000.00"
}
```

```json title="plan.updated"
{
  "type": "plan.updated",
  "invoice_id": null,
  "plan": "pro",
  "expires_at": 1794592000
}
```

## Verify the signature

Compute the HMAC-SHA256 of the raw request body with your secret. Compare it with `X-Lunaz-Signature` in constant time. Reject the request if the values differ. The [Webhooks guide](../../guides/webhooks/#verify-the-signature) has code for Node.js, Python and Go.

## Respond and retry

Return a 2xx status within 5 seconds. Lunaz treats any other status, and any network error, as a failure.

Lunaz tries each event up to 3 times: at once, after 10 s and after 60 s. After 3 failed attempts the event is marked failed, and you can send it again from the dashboard. Your endpoint can receive the same event more than once. Use the `invoice_id` to ignore a repeat.
