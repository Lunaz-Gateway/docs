---
title: Errors
description: Status codes, the JSON error shape and rate limits for the public API.
---

## Error shape

Errors are JSON with an `error` message.

```json
{ "error": "no such invoice" }
```

Use the status code for your logic. The message text can change.

## Status codes

| Code | Meaning |
| --- | --- |
| 200, 201 | Success. |
| 400 | Invalid input, or the account is not ready (for example no viewing key). |
| 401 | Missing, invalid or revoked API key. |
| 404 | The invoice does not exist. |
| 409 | The action conflicts with the current state of the invoice. |
| 429 | Too many requests. |
| 502 | The swap provider did not answer. |
| 503 | A price is not available. |
| 500 | Server error. Retry later. |

## Rate limits (429)

`POST /v1/invoices/{id}/swap` allows 5 requests for each invoice in 10 minutes. When you receive 429, wait and send the request again.
