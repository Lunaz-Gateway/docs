---
title: Authentication
description: Authenticate server requests with an API key and the Bearer header.
---

The API uses JSON. Send `Content-Type: application/json` with request bodies. The examples use `https://api.example.com` as the base URL.

## API keys

An API key lets your server create invoices. Send it in the `Authorization` header.

```http
Authorization: Bearer lz_your_api_key
```

Create and revoke keys on the API keys page of the [Lunaz dashboard](https://lunaz.example.com/dashboard). The dashboard shows a key one time. Copy it at once and keep it on your server.

Revoke a key at once if it leaks. The number of active keys depends on your plan. See [Pricing](../../pricing/).

## Endpoints without a key

These endpoints need no key. The invoice ID is the access token.

| Endpoint | Use |
| --- | --- |
| `GET /v1/invoices/{id}` | Read an invoice. |
| `GET /v1/invoices/{id}/ws` | Follow the status over WebSocket. |
| `GET /v1/swap/assets` | List the assets for cross-chain payment. |
| `POST /v1/invoices/{id}/swap` | Start a cross-chain payment. |
