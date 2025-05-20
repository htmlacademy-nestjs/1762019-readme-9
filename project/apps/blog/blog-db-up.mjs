#!/usr/bin/env zx

await $`docker compose \
  --file ./apps/blog/docker-compose.dev.yml \
  --env-file ./apps/blog/.env \
  --project-name "blog" \
  up -d`;
