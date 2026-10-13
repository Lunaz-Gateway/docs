---
title: Invoices
description: Create an invoice, read its status and follow it over WebSocket.
---

## Create an invoice

`POST /v1/invoices`

Auth: API key.

| Field | Type | Notes |
| --- | --- | --- |
| `amount_zat` | integer | Required. From 1 to 2100000000000000. |
| `expires_in_secs` | integer | Optional. Default 900. Lunaz limits it to 60 to 86400. |

```bash
curl -X POST https://api.example.com/v1/invoices \
  -H "Authorization: Bearer lz_your_api_key" \
  -H "Content-Type: application/json" \
  -d '{"amount_zat": 5000000}'
```

```json title="Response 200"
{
  "id": "8f14e45f-ceea-4672-9b2d-5c1d0a7e3b11",
  "address": "u1q8x4example7shieldedaddress",
  "amount_zat": 5000000,
  "zip321_uri": "zcash:u1q8x4example7shieldedaddress?amount=0.05&memo=bHVuYXo6OGYxNGU0NWY",
  "status": "pending",
  "expires_at": 1792000900
}
```

`expires_at` is a Unix time in seconds.

Errors:

| Status | Message | Cause |
| --- | --- | --- |
| 400 | `invalid amount_zat` | The amount is 0 or too large. |
| 400 | `viewing key not set` | The account has no viewing key. |
| 401 | `missing api key` or `bad api key` | No key, or an unknown or revoked key. |
| 402 | `monthly invoice limit reached for the Free plan` | The plan limit is reached. The body has `limit`, `used` and `plan`. |

## Read an invoice

`GET /v1/invoices/{id}`

Auth: none. The invoice ID is the access token.

```json title="Response 200"
{
  "id": "8f14e45f-ceea-4672-9b2d-5c1d0a7e3b11",
  "status": "detected",
  "amount_zat": 5000000,
  "address": "u1q8x4example7shieldedaddress",
  "zip321_uri": "zcash:u1q8x4example7shieldedaddress?amount=0.05&memo=bHVuYXo6OGYxNGU0NWY",
  "expires_at": 1792000900,
  "txid": "3b1c0f9e2a7d4c58b6e1a0f3d9c27b845e6a1f0d2c3b4a59687766554433221f",
  "received_zat": 5000000,
  "overpaid_zat": 0,
  "pending_zat": 0,
  "swap": null
}
```

When a swap exists, `swap` is an object.

```json
{
  "status": "PENDING_DEPOSIT",
  "symbol": "USDC",
  "blockchain": "eth",
  "deposit_address": "0xExampleDepositAddress0000000000000000000",
  "amount_in_formatted": "3.52",
  "deadline": "2026-10-13T12:30:00Z"
}
```

Error: 404 `no such invoice`.

## Follow an invoice over WebSocket

`GET /v1/invoices/{id}/ws`

Auth: none. Open the URL as a WebSocket (`wss://`).

The server sends a message when you connect and on each status change. If a swap exists, the message has `swap_status`. The server closes the connection on `paid`, `underpaid` or `expired`. An unknown ID sends `{"status":"not_found"}` and closes.

```json
{"status": "detected", "swap_status": "SUCCESS"}
```

See [Concepts](../../get-started/concepts/) for the statuses.
