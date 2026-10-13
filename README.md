# Lunaz Docs

Documentation site for Lunaz: product overview, quickstart, integration guides, API reference and pricing. Built with Astro and Starlight.

## Structure

- `src/content/docs/` holds the pages. Each `.md` or `.mdx` file becomes a route.
- `src/assets/` holds the logos. `public/` holds the favicon.
- `src/styles/lunaz.css` holds the Lunaz theme.
- `astro.config.mjs` holds the sidebar and site settings.

## Local development

```
npm install
npm run dev -- --port 4321
```

Run `npm run build` before you commit. The build fails on broken internal links.

## Environment

| Variable | When | Purpose |
| --- | --- | --- |
| `DOCS_SITE_URL` | build time, optional | Public URL of the docs, for example `https://docs.example.com`. Used for the sitemap and canonical links. |

## Docker

The image builds the static site with Node and serves it with unprivileged nginx on port 8080.

```
docker build --build-arg DOCS_SITE_URL=https://docs.example.com -t lunaz-docs .
docker run -d --name lunaz-docs \
  --read-only --tmpfs /tmp \
  --cap-drop ALL --security-opt no-new-privileges:true \
  --pids-limit 128 --memory 128m \
  -p 127.0.0.1:8080:8080 \
  --restart unless-stopped \
  lunaz-docs
```

- The container runs as the nginx user (uid 101) and needs no writable paths except `/tmp`.
- `GET /healthz` returns `ok`. The image health check uses it.
- Redirects are relative, so the site works behind a TLS reverse proxy (Caddy, nginx, Traefik or Dokploy). If the docs are served under a path prefix, strip the prefix at the proxy.
- Hashed assets under `/_astro/` are cached for one year. Unknown paths return the Starlight 404 page.
- Changing `DOCS_SITE_URL` or any page needs a new image.
