FROM node:18-alpine

RUN echo "Workdir"
WORKDIR /usr/src/app

RUN echo "Copiar arquivos"
COPY . /usr/src/app

RUN npm install -g npm@latest

RUN echo "CHOWN permissao"
RUN chmod -R 777 /usr/src/app

RUN echo "Expor porta"
EXPOSE 3000

RUN echo "Instalacao e build"
RUN npm install -g pnpm
RUN pnpm i
RUN pnpm i
RUN pnpm run build

RUN echo "Rodar aplicacao"
CMD ["pnpm", "start"]