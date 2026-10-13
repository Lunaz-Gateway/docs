---
title: Errors
description: Status codes, the JSON error shape and limits for the public API.
---

## Error shape

Errors are JSON with an `error` message.

```json
{ "error": "no such invoice" }
```

The 402 limit error adds `limit`, `used` and `plan`.

```json
{
  "error": "monthly invoice limit reached for the Free plan",
  "limit": 100,
  "used": 100,
  "plan": "free"
}
```

Use the status code for your logic. The message text can change.

## Status codes

| Code | Meaning |
| --- | --- |
| 200, 201 | Success. |
| 400 | Invalid input, or the account is not ready (for example no viewing key). |
| 401 | Missing, invalid or revoked API key. |
| 402 | A plan limit is reached. |
| 404 | The invoice does not exist. |
| 409 | The action conflicts with the current state of the invoice. |
| 429 | Too many requests. |
| 502 | The swap provider did not answer. |
| 503 | A price is not available. |
| 500 | Server error. Retry later. |

## Plan limits (402)

A 402 means that your plan does not allow the action. Free allows 100 invoices each month. To fix the error, upgrade the plan or wait for the next month. See [Pricing](../../pricing/).

## Rate limits (429)

`POST /v1/invoices/{id}/swap` allows 5 requests for each invoice in 10 minutes. When you receive 429, wait and send the request again.
