---
title: Security and privacy
description: What the Lunaz server can and cannot do, and which parts of a payment are public.
---

import { Aside } from '@astrojs/starlight/components';

Lunaz is non-custodial. The server holds viewing keys, never spending keys.

## What the server can do

- See incoming payments to the invoice addresses of its merchants. It sees the amounts and the transaction IDs.
- Create invoice addresses.

## What the server cannot do

- Spend funds. It holds no spending key.
- See outgoing payments or the balance of your wallet.

## Who sees your data

Only the signed-in merchant can see the ledger and the CSV export. An API key can create invoices and nothing else.

Lunaz does not store passwords. You sign in with an email code sent through Magic, and Lunaz stores only your email. It stores session tokens and API keys as hashes.

## What is public

- On chain, nothing links invoices to each other or to the merchant.
- In a cross-chain payment, the origin-chain deposit is public. Only the final shielded leg is private. NEAR Intents also records the swap.
- A withdrawal to a bank is not private. You send ZEC to a transparent deposit address of the partner, and the partner knows who you are.

<Aside type="caution">
The deposit address of a bank withdrawal is a transparent address. The ZEC leaves the shielded pool, and the partner can link the withdrawal to your account.
</Aside>

## The checkout link is a secret

The invoice ID is the access token for the public endpoints. Anyone who has the ID can read the invoice status and start a swap for it. Share the checkout link only with the buyer.

## Keep your keys safe

- Keep your spending keys in your own wallet. Do not give them to Lunaz.
- Keep your API keys on your server. Do not put them in browser code.
- Keep the webhook secret on your server.
