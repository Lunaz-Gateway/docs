# syntax=docker/dockerfile:1.7
FROM node:22-alpine AS build
WORKDIR /src
COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm npm ci --no-audit --no-fund
COPY . .
# Public URL of the docs; optional, used for the sitemap and canonical links
ARG DOCS_SITE_URL=
ENV DOCS_SITE_URL=$DOCS_SITE_URL
RUN npm run build

FROM nginxinc/nginx-unprivileged:1.28-alpine
LABEL org.opencontainers.image.title="lunaz-docs"
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /src/dist /usr/share/nginx/html
USER 101
EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --start-interval=2s --retries=3 \
  CMD wget -q -O /dev/null http://127.0.0.1:8080/healthz || exit 1
