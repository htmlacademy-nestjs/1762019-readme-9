await $`docker compose \
  --file ./docker-compose.dev.yml \
  --project-name "notification-center" \
  up -d`;
