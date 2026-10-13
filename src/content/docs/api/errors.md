---
title: Errors
description: Status codes, the JSON error shape, plan limits and rate limits.
---

## Error shape

Errors are JSON with an `error` message.

```json
{ "error": "no such invoice" }
```

Some errors have extra fields. The 402 limit error adds `limit`, `used` and `plan`.

```json
{
  "error": "api key limit reached for the Free plan",
  "limit": 2,
  "used": 2,
  "plan": "free"
}
```

Use the status code for your logic. The message text can change.

## Status codes

| Code | Meaning |
| --- | --- |
| 200, 201, 204 | Success. |
| 400 | Invalid input, or the account is not ready (for example no viewing key). |
| 401 | Missing, invalid or expired credential. |
| 402 | A plan limit is reached. |
| 404 | The invoice, key or withdrawal does not exist. |
| 409 | The action conflicts with the current state. |
| 429 | Too many requests. |
| 501 | The off-ramp provider is not available. |
| 502 | The swap provider did not answer. |
| 503 | A price or billing is not available. |
| 500 | `internal error`. Retry later. |

## Plan limits (402)

A 402 means that your plan does not allow the action. Free allows 100 invoices each month and 2 active API keys. To fix the error, upgrade the plan or wait for the next month. For API keys, you can also revoke a key. See [Pricing](/pricing/).

Invoices that pay for a Lunaz plan do not count toward the limit.

## Rate limits (429)

| Endpoint | Limit |
| --- | --- |
| `POST /v1/invoices/{id}/swap` | 5 requests for each invoice in 10 minutes. |
| `POST /v1/account/billing/checkout` | 10 requests for each account in 15 minutes. |

When you receive 429, wait and send the request again.
