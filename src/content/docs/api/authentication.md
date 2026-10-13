---
title: Authentication
description: Session tokens, API keys and the Bearer header.
---

The API uses JSON. Send `Content-Type: application/json` with request bodies. The examples use `https://api.example.com` as the base URL. Use the base URL that Lunaz gave you.

## Two kinds of credential

| Credential | Format | Use it for |
| --- | --- | --- |
| API key | `lz_...` | Create invoices from your server. |
| Session token | Opaque string | Everything that the dashboard does: account, keys, webhooks, export, withdrawals, billing. |
| None | | Read an invoice, WebSocket, swap assets, start a swap, list plans, health check. |

Send both credentials in the `Authorization` header.

```http
Authorization: Bearer <token or API key>
```

## API keys

An API key can create invoices and nothing else. Create a key in the dashboard or with the [API keys](../api-keys/) endpoints. Lunaz shows the key one time. It stores only a hash.

Revoke a key at once if it leaks.

## Session tokens

A session token is valid for 30 days. You get one when you sign in to the dashboard with your email and a one-time code. Sign-in happens in the dashboard, so the API has no public sign-in endpoint. Use an [API key](../api-keys/) for integrations.

Lunaz removed password sign-in. `POST /v1/auth/signup` and `POST /v1/auth/login` return 410.

### POST /v1/auth/logout

Auth: session. Response: 204 with no body.

## Health check

`GET /healthz` returns `200 ok`. It needs no credential.
