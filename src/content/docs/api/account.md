---
title: Account
description: Read your account and set the viewing key.
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
  "ufvk_set": true,
  "webhook_url": "https://shop.example.com/hooks/lunaz",
  "plan": "free"
}
```

`network` is `main` or `test`. `webhook_url` is `null` until you set it. `plan` is the plan ID that applies now.

## Set the account name

`PUT /v1/account`

| Field | Type | Notes |
| --- | --- | --- |
| `name` | string | 1 to 80 characters. |

The name is optional. A new account has an empty name. Set it in Settings in the dashboard or with this endpoint.

Response: 204 with no body.

## Set the viewing key

`PUT /v1/account/ufvk`

| Field | Type | Notes |
| --- | --- | --- |
| `ufvk` | string | A Unified Full Viewing Key for the network of the service. |

Response: 204 with no body.

:::caution
YOU CAN SET THE VIEWING KEY ONE TIME. YOU CANNOT CHANGE IT AFTER YOU SET IT.
:::

Errors:

| Status | Message |
| --- | --- |
| 400 | A message about the invalid key. |
| 409 | `viewing key already set` |
| 409 | `viewing key is already used by another account` |

## Related

- [Invoices](/api/invoices/) lists your invoices with `GET /v1/account/invoices`.
- [Plans and billing](/api/plans-and-billing/) shows your plan and usage.
