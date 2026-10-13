# syntax=docker/dockerfile:1.7
FROM node:22-alpine AS build
WORKDIR /src
COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm npm ci --no-audit --no-fund
COPY . .
# Public URL of the docs; optional, used for the sitemap and canonical links
ARG DOCS_SITE_URL=
# Path prefix when served below the domain root, e.g. /docs (keep it in the proxied path: no Strip Path)
ARG DOCS_BASE_PATH=
# Public Lunaz URLs that replace the placeholder links in the docs content
ARG DOCS_API_URL=
ARG DOCS_DASHBOARD_URL=
ARG DOCS_LANDING_URL=
ARG DOCS_DEMO_URL=
ENV DOCS_SITE_URL=$DOCS_SITE_URL DOCS_BASE_PATH=$DOCS_BASE_PATH \
    DOCS_API_URL=$DOCS_API_URL DOCS_DASHBOARD_URL=$DOCS_DASHBOARD_URL \
    DOCS_LANDING_URL=$DOCS_LANDING_URL DOCS_DEMO_URL=$DOCS_DEMO_URL
RUN node scripts/apply-urls.mjs && npm run build \
    && base="${DOCS_BASE_PATH%/}" \
    && mkdir -p "/site$base" && cp -r dist/. "/site$base/" \
    && sed "s#__BASE__#$base#g" nginx.conf > /site.conf \
    && if [ -n "$base" ]; then sed -i "s/#BASEONLY //" /site.conf; fi

FROM nginxinc/nginx-unprivileged:1.28-alpine
LABEL org.opencontainers.image.title="lunaz-docs"
USER root
# Drop the stock welcome page so only the docs are served
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /site.conf /etc/nginx/conf.d/default.conf
COPY --from=build /site /usr/share/nginx/html
USER 101
EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --start-interval=2s --retries=3 \
  CMD wget -q -O /dev/null http://127.0.0.1:8080/healthz || exit 1
