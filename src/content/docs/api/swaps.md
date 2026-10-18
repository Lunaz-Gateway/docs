---
title: Swaps
description: List swap assets and start a cross-chain payment for an invoice.
---

See the [guide](../../guides/accept-other-crypto/) for the full flow.

## List assets

`GET /v1/swap/assets`

Auth: none. Lunaz caches the list for 5 minutes.

```json title="Response 200"
[
  {
    "asset_id": "nep141:usdc.example",
    "symbol": "USDC",
    "blockchain": "eth",
    "decimals": 6,
    "price_usd": 1.0,
    "contract_address": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
  }
]
```

`contract_address` is the token contract or mint. It is `null` for native coins such as ETH, SOL and BTC.

## Start a swap

`POST /v1/invoices/{id}/swap`

Auth: none. The invoice ID is the access token.

| Field | Type | Notes |
| --- | --- | --- |
| `asset_id` | string | An `asset_id` from the asset list. |
| `refund_to` | string | The buyer's refund address on the origin chain. |

```json title="Response 201"
{
  "swap_id": "5d7c0e2a-9a41-4c3e-8d1f-2b6a7e90c4d3",
  "deposit_address": "0xExampleDepositAddress0000000000000000000",
  "deposit_memo": null,
  "deposit_uri": "ethereum:0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48@1/transfer?address=0xExampleDepositAddress0000000000000000000&uint256=3520000",
  "amount_in": "3520000",
  "amount_in_formatted": "3.52",
  "amount_in_usd": "3.52",
  "symbol": "USDC",
  "blockchain": "eth",
  "deadline": "2026-10-13T12:30:00Z",
  "time_estimate": 120
}
```

The quote is exact-output for the invoice amount. The 1Click fee is added to `amount_in`. The deadline is the invoice expiry, or 30 minutes from now if that is earlier. The minimum invoice for a swap is approximately 100000 zat.

`deposit_uri` is a payment request that a wallet can open with the token, amount and deposit address filled in. Encode it in the QR code. It is a string or `null`:

| Chain | Format |
| --- | --- |
| Ethereum, Base, Arbitrum | EIP-681 (`ethereum:`) |
| Solana | Solana Pay (`solana:`) |
| Bitcoin | BIP-21 (`bitcoin:`) |

It is `null` when the deposit needs a memo or the chain has no standard format, for example NEAR. Then show `deposit_address` and `amount_in_formatted` instead. Some wallets do not support these formats, so show the address and amount as a fallback in all cases.

A new request replaces the old swap. The old deposit address is abandoned.

Errors:

| Status | Message | Cause |
| --- | --- | --- |
| 400 | `refund_to required` | The refund address is empty. |
| 400 | `unsupported asset_id` | The asset is not in the list. |
| 400 | 1Click message | 1Click rejected the quote, for example for a bad refund address or an amount below the minimum. |
| 404 | `no such invoice` | Unknown invoice. |
| 409 | `invoice is not pending` | The invoice is not `pending` or has expired. |
| 409 | `a swap is already in progress (...)` | 1Click already saw a deposit. |
| 429 | `too many swap requests, try again later` | More than 5 requests for one invoice in 10 minutes. |
| 502 | `swap provider unavailable` | 1Click did not answer. |
