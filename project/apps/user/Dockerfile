FROM node:22.12.0-alpine

WORKDIR /opt/readme-users

COPY ./dist/package.json .
RUN npm install --omit=dev
COPY ./dist .

CMD ["node", "./main.js"]
