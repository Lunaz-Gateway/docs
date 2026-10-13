---
title: Account
description: Read your account, set the name and set the viewing key.
---

All endpoints on this page need a session token.

## Get the account

`GET /v1/account`

```json title="Response 200"
{
  "id": 42,
  "email": "owner@example.com",
  "name": "Kedai Contoh",
  "network": "main",
  "viewing_key_set": true,
  "ufvk_set": true,
  "webhook_url": "https://shop.example.com/hooks/lunaz",
  "plan": "free"
}
```

`viewing_key_set` is `true` when the account has a viewing key. `ufvk_set` has the same value and is kept for older clients. `network` is `main` or `test`. `webhook_url` is `null` until you set it. `plan` is the plan ID that applies now.

## Set the account name

`PUT /v1/account`

| Field | Type | Notes |
| --- | --- | --- |
| `name` | string | 1 to 80 characters. |

The name is optional. A new account has an empty name. Set it in Settings in the dashboard or with this endpoint.

Response: 204 with no body.

## Set the viewing key

`PUT /v1/account/viewing-key`

| Field | Type | Notes |
| --- | --- | --- |
| `viewing_key` | string | An incoming viewing key (`uivk…`) or a Unified Full Viewing Key (`uview…`) for the network of the service. |

Lunaz keeps only the incoming part of the key. The key must have an Orchard component.

The legacy endpoint `PUT /v1/account/ufvk` with the field `ufvk` still works and accepts the same keys.

Response: 204 with no body.

:::caution
YOU CAN SET THE VIEWING KEY ONE TIME. YOU CANNOT CHANGE IT AFTER YOU SET IT.
:::

Errors:

| Status | Message |
| --- | --- |
| 400 | `invalid viewing key: expected a unified incoming viewing key (uivk…) or full viewing key (uview…)` |
| 400 | `viewing key has no Orchard component` |
| 409 | `viewing key already set` |
| 409 | `viewing key is already used by another account` |

## Related

- [Invoices](../invoices/) lists your invoices with `GET /v1/account/invoices`.
- [Plans and billing](../plans-and-billing/) shows your plan and usage.
