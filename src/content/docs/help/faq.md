---
title: FAQ
description: Short answers about privacy, funds, cross-chain payments and operation.
---

## Is the buyer fully anonymous?

Not entirely. A buyer who pays from another chain still makes a public deposit on that chain. Nothing public links that deposit to the shop or to what was bought.

## Does Lunaz hold my money?

No. The server holds viewing keys only, never spending keys. Funds go to your own shielded wallet.

## Is cross-chain payment live?

Yes, through NEAR Intents. The assets are USDC, USDT, SOL, ETH and BTC on their main chains. The invoice must be at least 0.001 ZEC. A failed swap is refunded to the buyer's address.

## What if a buyer pays too much or too little?

Payments to the same address add up, so a buyer can top up before the invoice expires. Lunaz records an excess as overpaid. A short payment ends as underpaid. Lunaz cannot refund either, because it cannot spend. You refund the buyer.

## Which shielded pools does it watch?

Orchard and Ironwood, in both the mempool and mined blocks. A payment shows as `detected` in seconds. It becomes `paid` after one confirmation, which takes about 75 seconds.

## Do I need to run any infrastructure?

No. Lunaz is a managed service. We run the gateway, the chain watcher and the cross-chain swaps. You sign in with your email, connect the viewing key of your wallet and call the API.

## Where do I find my incoming viewing key?

With zcash-devtool, run `wallet list-accounts`. The command prints the incoming viewing key (UIVK) on the `UIVK:` line. A full viewing key (UFVK) also works. See the [Quickstart](../../get-started/quickstart/).

## Can I change my viewing key?

No. You can set it one time. Check it before you save it.

## What does it cost?

There is a free tier. See [Pricing](../../pricing/).

## What happens if my webhook endpoint is down?

Lunaz retries after 10 s, 60 s and 300 s. Every attempt appears in the delivery log. See [Webhooks](../../guides/webhooks/).
