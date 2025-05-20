#!/usr/bin/env zx

await $`docker compose \
  --file ./apps/user/docker-compose.dev.yml \
  --env-file ./apps/user/.env \
  --project-name "user" \
  up -d`;
