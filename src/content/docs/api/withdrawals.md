---
title: Withdrawals
description: Quote, create and track a withdrawal to a bank account.
---

All endpoints on this page need a session token. Read the [guide](../../guides/withdraw-to-bank/) first. The current partner is a mock.

:::caution
THE MOCK DEPOSIT ADDRESS IS NOT A VALID ZCASH ADDRESS. DO NOT SEND FUNDS TO IT.
:::

## Off-ramp information

`GET /v1/account/offramp`

```json title="Response 200"
{
  "provider": "mock",
  "sandbox": true,
  "currencies": ["IDR", "USD"],
  "min_zat": 100000,
  "received_zat": 250000000,
  "zec_usd": 40.0
}
```

`received_zat` is the sum of mined payments to your invoices. It is not a wallet balance.

## Get a quote

`POST /v1/account/withdrawals/quote`

| Field | Type |
| --- | --- |
| `amount_zat` | integer |
| `currency` | string |

```json title="Response 200"
{
  "amount_zat": 100000000,
  "currency": "IDR",
  "rate": "656000.000000",
  "fee_fiat": "9840.00",
  "network_fee_zat": 10000,
  "fiat_amount": "645991.00",
  "expires_at": 1792000600
}
```

A quote is not stored and is valid for 10 minutes.

Errors: 400 below `min_zat` (100000), above 2100000000000000 zat, or for an unsupported currency. 503 when no ZEC price is available.

## Create a withdrawal

`POST /v1/account/withdrawals`

The body is the same as for a quote. The response is 201 with the withdrawal. It starts at `awaiting_kyc`.

```json title="Response 201"
{
  "id": "c2d9a1e4-7b36-4f0a-9e52-0d8b1a6c3f77",
  "provider": "mock",
  "sandbox": true,
  "status": "awaiting_kyc",
  "amount_zat": 100000000,
  "fiat_currency": "IDR",
  "fiat_amount": "645991.00",
  "rate": "656000.000000",
  "fee_fiat": "9840.00",
  "network_fee_zat": 10000,
  "deposit_address": "t1SANDBOXxDoNotSendFundsxxxxxxxxx",
  "deposit_uri": "zcash:t1SANDBOXxDoNotSendFundsxxxxxxxxx?amount=1.00000000",
  "bank_label": null,
  "provider_ref": null,
  "created_at": 1792000000,
  "updated_at": 1792000000,
  "expires_at": 1792001800,
  "events": []
}
```

## List and read

- `GET /v1/account/withdrawals?limit=50` lists withdrawals, newest first. `limit` is from 1 to 200.
- `GET /v1/account/withdrawals/{id}` returns one withdrawal. Error: 404 `no such withdrawal`.

`events` is a list of `{status, note, created_at}`.

## Mock steps

These endpoints exist in mock mode only. With a real partner, the partner widget does the identity step and these routes return 404.

`POST /v1/account/withdrawals/{id}/kyc`

| Field | Type | Notes |
| --- | --- | --- |
| `bank_name` | string | Required. |
| `account_last4` | string | Exactly 4 digits. |

Lunaz stores the label only. The status becomes `awaiting_deposit` with a 30 minute window.

`POST /v1/account/withdrawals/{id}/simulate-deposit` moves `awaiting_deposit` to `deposit_received`. Then it moves to `converting`, `payout_processing` and `completed` in steps of 5 seconds.

## Cancel

`POST /v1/account/withdrawals/{id}/cancel`

You can cancel before `deposit_received`. An action that is not allowed in the current status returns 409 `invalid status for this action`.

## Statuses

`awaiting_kyc`, `awaiting_deposit`, `deposit_received`, `converting`, `payout_processing`, `completed`, `expired`, `failed`, `cancelled`.

An expired quote or deposit window sets `expired`. Lunaz checks every 10 seconds. Each change sends a `withdrawal.updated` webhook.

When Lunaz runs with the real partner before the integration is available, quotes and new withdrawals return 501 `off-ramp provider not configured`.
