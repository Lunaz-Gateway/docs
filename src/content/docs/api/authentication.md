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

An API key can create invoices and nothing else. Create a key in the dashboard or with the [API keys](/api/api-keys/) endpoints. Lunaz shows the key one time. It stores only a hash.

Revoke a key at once if it leaks.

## Session tokens

A session token is valid for 30 days. Get one with signup or login.

### POST /v1/auth/signup

Auth: none.

| Field | Type | Notes |
| --- | --- | --- |
| `email` | string | Must be a valid email. |
| `name` | string | Required. |
| `password` | string | At least 8 characters. |

```json title="Response 201"
{ "token": "sess_example_token_0123456789abcdef" }
```

Errors: 400 for invalid input, 409 `email already registered`, 429 `too many attempts, try again later`.

### POST /v1/auth/login

Auth: none.

| Field | Type |
| --- | --- |
| `email` | string |
| `password` | string |

```json title="Response 200"
{ "token": "sess_example_token_0123456789abcdef" }
```

Errors: 401 `invalid email or password`, 429.

### POST /v1/auth/logout

Auth: session. Response: 204 with no body.

## Rate limits

Signup and login accept 10 attempts for each email and 30 for each client IP in 15 minutes. After that the API returns 429. See [Errors](/api/errors/).

## Health check

`GET /healthz` returns `200 ok`. It needs no credential.
