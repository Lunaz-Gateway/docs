---
title: Plans and billing
description: List plans, read your usage and pay for a plan with a ZEC invoice.
---

See [Pricing](../../pricing/) for the plan table.

## List plans

`GET /v1/plans`

Auth: none.

```json title="Response 200"
[
  { "id": "free", "name": "Free", "price_usd": 0.0, "invoices_per_month": 100, "api_keys": 2 },
  { "id": "pro", "name": "Pro", "price_usd": 29.0, "invoices_per_month": 5000, "api_keys": 10 },
  { "id": "platform", "name": "Platform", "price_usd": 199.0, "invoices_per_month": null, "api_keys": 50 },
  { "id": "enterprise", "name": "Enterprise", "price_usd": null, "invoices_per_month": null, "api_keys": null }
]
```

`null` means unlimited for Platform invoices. For Enterprise, `null` means the values are set by contract.

## Read your plan and usage

`GET /v1/account/plan`

Auth: session.

```json title="Response 200"
{
  "plan": "free",
  "plan_name": "Free",
  "expires_at": null,
  "limits": { "invoices_per_month": 100, "api_keys": 2 },
  "usage": { "invoices_this_month": 12, "api_keys_active": 1 },
  "period_start_of_month": 1790812800,
  "sandbox_billing": false,
  "billing_configured": true
}
```

`expires_at` is the end of the paid period. It is `null` on the Free plan. `period_start_of_month` is the start of the current usage month, at 00:00 UTC on the first day.

## Start a checkout

`POST /v1/account/billing/checkout`

Auth: session.

| Field | Type | Notes |
| --- | --- | --- |
| `plan` | string | `pro` or `platform`. |
| `months` | integer | 1, 3 or 12. |

```json title="Response 200"
{
  "subscription_id": "a7f3d1c0-5e2b-4b88-9c14-6d0e2f8a1b39",
  "plan": "pro",
  "months": 1,
  "price_usd": 29.0,
  "amount_zat": 72500000,
  "zec_usd": 40.0,
  "invoice": {
    "id": "d41d8cd9-8f00-4204-a98f-0998ecf8427e",
    "address": "u1q8x4exampletreasuryaddress",
    "zip321_uri": "zcash:u1q8x4exampletreasuryaddress?amount=0.725&memo=bHVuYXo6YmlsbGluZw",
    "expires_at": 1792001800,
    "status": "pending"
  }
}
```

Show the `zip321_uri` as a QR code and pay it from your wallet. The invoice is valid for 30 minutes. The amount is the USD price at the ZEC price at checkout time, rounded up.

Errors:

| Status | Message |
| --- | --- |
| 400 | `plan is not purchasable` |
| 400 | `months must be 1, 3 or 12` |
| 429 | `too many checkouts` |
| 503 | `billing not configured` or `zec price unavailable` |

## List subscriptions

`GET /v1/account/billing`

Auth: session. The newest subscription comes first.

```json title="Response 200"
[
  {
    "id": "a7f3d1c0-5e2b-4b88-9c14-6d0e2f8a1b39",
    "plan": "pro",
    "months": 1,
    "price_usd": 29.0,
    "amount_zat": 72500000,
    "zec_usd": 40.0,
    "invoice_id": "d41d8cd9-8f00-4204-a98f-0998ecf8427e",
    "status": "paid",
    "invoice_status": "paid",
    "created_at": 1792000000,
    "paid_at": 1792000300,
    "period_start": 1792000300,
    "period_end": 1794592300
  }
]
```

`status` is `pending`, `paid` or `expired`.

## Limit errors

When you reach a limit, the API returns 402 with this body. It applies to `POST /v1/invoices` and `POST /v1/account/api-keys`.

```json title="402 Payment Required"
{
  "error": "monthly invoice limit reached for the Free plan",
  "limit": 100,
  "used": 100,
  "plan": "free"
}
```

## Plan webhook

Lunaz sends `plan.updated` when a payment activates a plan and when a paid plan expires. See [Webhooks](../../guides/webhooks/).
