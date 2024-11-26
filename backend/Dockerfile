FROM node:18-alpine

WORKDIR /usr/src/app

COPY . /usr/src/app

RUN chmod -R 777 /usr/src/app

EXPOSE 8080

RUN npm install -g pnpm
RUN pnpm i
RUN pnpm run build

CMD ["pnpm", "start"]
