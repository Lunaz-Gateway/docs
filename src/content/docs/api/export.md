---
title: Export
description: Download invoices or payments as a CSV file.
---

`GET /v1/account/export.csv`

Auth: session token. An API key does not work.

| Query | Type | Notes |
| --- | --- | --- |
| `kind` | string | `invoices` (default) or `payments`. |
| `from` | integer | Unix time. Filters on the creation time of the invoice. Default: all. |
| `to` | integer | Unix time. Same filter. |

The file has at most 50000 rows. The response is a `text/csv` attachment named `lunaz-<kind>-<from>-<to>.csv`. It has a header row and uses RFC 4180 quoting. ZEC amounts are exact strings with 8 decimals.

```bash
curl -H "Authorization: Bearer <session token>" \
  "https://api.example.com/v1/account/export.csv?kind=payments" -o payments.csv
```

```csv title="kind=invoices"
invoice_id,created_at,paid_at,status,amount_zec,received_zec,overpaid_zec,usd_rate,received_usd,txid,paid_with,origin_chain,origin_amount,swap_status
8f14e45f-ceea-4672-9b2d-5c1d0a7e3b11,2026-10-13T09:00:00Z,2026-10-13T09:03:30Z,paid,0.05000000,0.05000000,0.00000000,40.00,2.00,3b1c0f9e...,ZEC,,,
```

```csv title="kind=payments"
txid,action_index,pool,invoice_id,value_zec,block_height,invoice_status
3b1c0f9e...,0,orchard,8f14e45f-ceea-4672-9b2d-5c1d0a7e3b11,0.05000000,3100000,paid
```

Error: 400 for an invalid `kind` or range. See the [guide](/guides/accountant-export/) for all columns.
