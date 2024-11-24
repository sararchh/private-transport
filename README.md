# Táxi

Este projeto consiste no desenvolvimento do backend e frontend de uma aplicação para transporte particular utilizando o API do Google Maps, permitindo a solicitação e gerenciamento de corridas de táxi.

## Tecnologias Utilizadas FrontEnd
- [Next.JS](https://nextjs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [Tailwindcss](https://tailwindcss.com/)
- [Chakra](https://www.chakra-ui.com/)
- [Axios](https://axios-http.com/)
- [React-toastify](https://www.npmjs.com/package/react-toastify)
- [React-hook-form](https://react-hook-form.com/)

## Tecnologias Utilizadas BackEnd
- [Node](https://nodejs.org/en)
- [Express](https://expressjs.com/)
- [Zod](https://zod.dev/)
- [SQLite](https://www.sqlite.org/)

## Variáveis de Ambiente
 ```
 - No Frontend crie o `.env.local` informado a variável `NEXT_PUBLIC_GOOGLE_API_KEY=`;

 - No Backend crie `.env` informando a variável `GOOGLE_API_KEY=`;
 ```

## Instalação Docker
1. Clone este repositório:
  ```
  git clone https://github.com/sararchh/private-transport.git
  ```

2. Navegue até o diretório do projeto:
  ```
  cd private-transport
  ```

3. Navegue até o diretório do backend:
  ```
  cd backend
  ```

4. Construa e inicie os contêineres do backend:
  ```
  docker build -t taxi-backend .
  docker-compose up
  ```

5. Em uma nova janela de terminal, navegue até o diretório do frontend:
  ```
  cd frontend
  ```

6. Construa e inicie os contêineres do frontend:
  ```
  docker build -t taxi-frontend .
  docker-compose up
  ```

 ## Agora, o backend estará disponível na porta 8080 e o frontend na porta 80.