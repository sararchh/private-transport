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
  - No diretório raiz crie o **.env** com a variável de ambiente **GOOGLE_API_KEY=**;
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

3. Construa e inicie os contêineres do backend e frontend:
  ```
  docker-compose up --build
  ```

## Agora, o backend estará disponível na porta 8080 e o frontend na porta 80.

## Rodando os Testes no Backend

1. Navegue até o diretório do backend:
  ```
  cd backend
  ```

2. Execute os testes:
  ```
  pnpm test
  ```