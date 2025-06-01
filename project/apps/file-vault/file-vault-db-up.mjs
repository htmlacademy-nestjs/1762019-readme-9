#!/usr/bin/env zx

await $`docker compose \
  --file ./docker-compose.dev.yml \
  --env-file ./.env \
  --project-name "file-vault" \
  up -d`;
