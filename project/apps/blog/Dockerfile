# Debian Linux (Prisma CLI don't work on Alpine Linux)
FROM node:22.12.0-slim

# to make Prisma CLI work on Debian Linux
RUN apt-get update && apt-get install -y openssl libssl-dev

WORKDIR /opt/readme-blog

COPY ./apps/blog/dist/package.json .

RUN npm install --omit=dev

COPY ./libs/blog/models/prisma/schema.prisma ./schema.prisma

RUN npx prisma@6.8.2 generate --schema schema.prisma

# previous command will generate client in the following dir:
# generator client {
#   provider = "prisma-client-js"
#   output   = "../../../../node_modules/.prisma/client"
# }
# we need to copy it inside node_modules and then remove originally generated file
RUN cp -R ../../../../node_modules/.prisma ./node_modules && rm -rf ../../../../node_modules

COPY ./apps/blog/dist .

CMD ["node", "./main.js"]

