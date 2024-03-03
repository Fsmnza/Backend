FROM node:20.4.0-alpine

WORKDIR /srv/backend

RUN npm i -g pnpm

COPY . .

RUN pnpm i
RUN pnpm build

ENTRYPOINT [ "pnpm", "prod" ]
