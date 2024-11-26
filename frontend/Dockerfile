FROM node:18-alpine

WORKDIR /usr/src/app

COPY . /usr/src/app

RUN chmod -R 777 /usr/src/app

EXPOSE 3000

ARG NEXT_PUBLIC_GOOGLE_API_KEY
ENV NEXT_PUBLIC_GOOGLE_API_KEY=${NEXT_PUBLIC_GOOGLE_API_KEY}

RUN npm install -g pnpm
RUN pnpm i
RUN pnpm run build

CMD ["pnpm", "start"]
