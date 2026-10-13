---
title: Webhooks
description: Set the webhook URL, rotate the secret, send a test and read the delivery log.
---

All endpoints on this page need a session token. See the [guide](../../guides/webhooks/) for payloads and signature checks.

## Get the webhook

`GET /v1/account/webhook`

```json title="Response 200"
{
  "url": "https://shop.example.com/hooks/lunaz",
  "secret": "9c1e4f7a2b8d3c6e5f0a1b2c3d4e5f60"
}
```

## Set the URL

`PUT /v1/account/webhook`

| Field | Type | Notes |
| --- | --- | --- |
| `url` | string or null | Must start with `http://` or `https://`. Use `null` to remove the webhook. |

Response: 204. Error: 400 `url must start with http:// or https://`.

## Rotate the secret

`POST /v1/account/webhook/rotate`

```json title="Response 200"
{ "secret": "e4b7a1c9d2f60835a1b2c3d4e5f60718" }
```

## Send a test

`POST /v1/account/webhook/test`

Lunaz sends one `test` event with a single attempt and no retry.

```json title="Response 200 (delivered)"
{ "status": 200 }
```

```json title="Response 200 (failed)"
{ "error": "error sending request" }
```

`status` is the HTTP status code of your endpoint. Error: 400 `webhook url not set`.

## Delivery log

`GET /v1/account/webhook/deliveries?limit=50`

`limit` is from 1 to 200. The default is 50. The newest rows come first. There is one row for each attempt.

```json title="Response 200"
[
  {
    "id": 311,
    "invoice_id": "8f14e45f-ceea-4672-9b2d-5c1d0a7e3b11",
    "type": "invoice.paid",
    "url": "https://shop.example.com/hooks/lunaz",
    "status_code": 200,
    "error": null,
    "attempt": 1,
    "created_at": 1792000215
  }
]
```

`invoice_id` is `null` for events that are not about an invoice. `status_code` is `null` after a network error.
