# Projeto API de Filmes

## Apresentação

Olá, seja bem-vindo ao projeto da minha API de Filmes! Esta API permite que os usuários possam se cadastrar, se logar e por fim fazer o gerenciamento de uma lista de filmes

## Descrição

A API de Filmes fornece endpoints para que os usuários possam pesquisar e recuperar informações sobre filmes, incluindo títulos, descrições, datas de lançamento e mais. Além disso, possui um sistema de autenticação de usuários que permite o registro e login.

### Principais Funcionalidades:

- **Cadastro de Usuários**: Permite que novos usuários se cadastrem na plataforma.
- **Autenticação de Usuários**: Sistema seguro de login e registro.
- **Banco de Dados de Filmes**: Acesso a uma coleção abrangente de filmes.

## Tecnologias Utilizadas

Este projeto utiliza as seguintes tecnologias:

- **Node.js**: Ambiente de execução JavaScript para construção de aplicações do lado do servidor.
- **NestJS**: Framework para construir aplicações escaláveis em Node.js.
- **Express.js**: Framework web para Node.js para criar endpoints da API.
- **TypeORM**: ORM para interação com o banco de dados.
- **PostgreSQL**: Banco de dados relacional para armazenar dados de usuários e filmes.
- **Redis**: Armazenamento de estrutura de dados em memória utilizado para caching.
- **Docker**: Plataforma de containerização para executar e gerenciar dependências da aplicação.
- **Docker Compose**: Ferramenta para definir e executar aplicações multi-containers Docker.

## Início Rápido

Siga estas instruções para configurar e executar o projeto em sua máquina local.

### Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js**
- **Docker**

### Instalação

1. **Clone o repositório**:

2. **Instale as dependências do Node.js**:

    ```sh
    npm install
    ```

3. **Configure as variáveis de ambiente**:

    Crie um arquivo `.env` na raiz do projeto e adicione as variáveis de ambiente do projeto, é possivel visualizar elas no arqui .env.default ou use o exemplo abaixo:

    ```sh
    DB_HOST=127.0.0.1
    DB_PORT=5432
    DB_USERNAME=postgres
    DB_PASSWORD=123456
    DB_NAME=db_movie_store

    PORT=3000

    BCRYPT_HASH=$2b$10$gwoHS3vzrxQmbA87Asicle
    JWT_SECRET=ddc25149-95bb-4c8a-9915-46cbe9e07eaf
    ```

### Executando o Projeto

4. **Inicie os containers Docker**:

    Use o Docker Compose para iniciar os serviços necessários (PostgreSQL e Redis) em modo destacado:

    ```sh
    docker-compose up -d
    ```

5. **Execute a aplicação em modo de desenvolvimento**:

    Inicie o servidor Node.js:

    ```sh
    npm run start:dev
    ```

### Documentação da API

Para uma documentação detalhada da API, consulte o [Documentação no postman](https://documenter.getpostman.com/view/24011697/2sA3QqfskV).
