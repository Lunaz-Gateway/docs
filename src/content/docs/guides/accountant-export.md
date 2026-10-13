---
title: Accountant export
description: Export invoices or payments as CSV, with the USD rate recorded at payment.
---

The CSV export gives your accountant a complete record of your payments. Only the signed-in merchant can download it.

## Download the file

1. Open the Invoices page in the dashboard.
2. Select Export CSV.
3. Choose a date range.
4. Choose Invoices or Payments.
5. Select Download.

A file has at most 50000 rows.

## Invoice export

Choose Invoices for one row for each invoice.

| Column | Meaning |
| --- | --- |
| `invoice_id` | The invoice ID. |
| `created_at` | Creation time, ISO 8601 UTC. |
| `paid_at` | Time the invoice turned paid, ISO 8601 UTC. |
| `status` | The invoice status. |
| `amount_zec` | The invoice amount in ZEC. |
| `received_zec` | The received amount in ZEC. |
| `overpaid_zec` | The excess in ZEC. |
| `usd_rate` | USD per ZEC at payment. |
| `received_usd` | The received amount in USD at that rate. |
| `txid` | The transaction ID. |
| `paid_with` | `ZEC`, or the swap symbol after a successful swap. |
| `origin_chain` | The origin chain of a cross-chain payment. |
| `origin_amount` | The amount the buyer sent on the origin chain. |
| `swap_status` | The swap status. |

ZEC amounts are exact strings with 8 decimals.

### The USD rate

Lunaz records `usd_rate` from the swap price when the invoice turns `paid` or `underpaid`. The rate does not change later. Invoices from before this feature have no rate.

## Payments export

Choose Payments for one row for each shielded action that paid one of your invoices.

| Column | Meaning |
| --- | --- |
| `txid` | The transaction ID. |
| `action_index` | The index of the action in the transaction. |
| `pool` | `orchard` or `ironwood`. |
| `invoice_id` | The invoice that the action paid. |
| `value_zec` | The value in ZEC. |
| `block_height` | The block height. Empty while the payment is only in the mempool. |
| `invoice_status` | The status of the invoice. |

## Date range

The date range filters on the creation time of the invoice. Without a range, the export has all invoices.
