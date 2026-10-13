---
title: API keys
description: List, create and revoke API keys.
---

All endpoints on this page need a session token.

## List keys

`GET /v1/account/api-keys`

```json title="Response 200"
[
  {
    "id": 7,
    "name": "production",
    "prefix": "lz_3f9a1c2b4",
    "created_at": 1792000000,
    "last_used_at": 1792003600,
    "revoked_at": null
  }
]
```

The list does not contain the full key.

## Create a key

`POST /v1/account/api-keys`

| Field | Type | Notes |
| --- | --- | --- |
| `name` | string | Required. A label for you. |

```json title="Response 201"
{
  "id": 8,
  "name": "staging",
  "prefix": "lz_7b2e5d9a1",
  "key": "lz_7b2e5d9a1c0f4e8a6b3d2c1f0e9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a"
}
```

:::caution
COPY THE KEY AT ONCE. LUNAZ SHOWS IT ONE TIME ONLY.
:::

Errors:

| Status | Message |
| --- | --- |
| 400 | `name required` |
| 402 | `api key limit reached for the Free plan`. The body has `limit`, `used` and `plan`. |

Revoked keys do not count toward the limit.

## Revoke a key

`DELETE /v1/account/api-keys/{id}`

Response: 204 with no body. Error: 404 `no such api key`.
