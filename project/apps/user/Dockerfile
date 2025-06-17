FROM node:22.12.0-alpine

WORKDIR /opt/readme-users

COPY ./dist .

RUN npm install --omit=dev

CMD ["node", "./main.js"]
