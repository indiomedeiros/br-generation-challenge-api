# BR Generation Challenge - Sistema de Gerenciamento de Participantes

## 📋 Sobre o Projeto

Este é um sistema de gerenciamento de participantes desenvolvido com **NestJS** e **TypeORM**, utilizando alguns conceitos de arquitetura limpa. O sistema é uma API com nível de maturidade 3 que faz o cadastro, consulta, atualização, remoção de participantes e calcula automaticamente a média final baseada nas notas dos semestres.

## 🏗️ Arquitetura

O projeto segue alguns princípios da **Clean Architecture** e **Domain-Driven Design (DDD)**, organizando o código em camadas:

```
src/
├── participant/
│   ├── application/         # 📋 Camada de Aplicação
│   │   ├── dto/             #    Data Transfer Objects
│   │   └── usecases/        #    Casos de Uso (Regras de Negócio)
│   ├── domain/              # 🏛️ Camada de Domínio
│   │   ├── entities/        #    Entidades de Negócio
│   │   ├── repositories/    #    Contratos de Repositórios
│   │   └── services/        #    Serviços de Domínio
│   ├── infra/               # 🔧 Camada de Infraestrutura
│   │   └── orm/             #    Implementações ORM/Repositórios
│   └── presentation/        # 🌐 Camada de Apresentação
│       ├── controllers/     #    Controladores HTTP
│       └── interceptors/    #    Interceptadores (HATEOAS)
```

## 🚀 Tecnologias Utilizadas

- **[NestJS](https://nestjs.com/)** - Framework Node.js progressivo
- **[TypeORM](https://typeorm.io/)** - ORM para TypeScript/JavaScript
- **[MySQL](https://www.mysql.com/)** - Sistema de gerenciamento de banco de dados
- **[TypeScript](https://www.typescriptlang.org/)** - Superset tipado do JavaScript
- **[Class Validator](https://github.com/typestack/class-validator)** - Validação de dados
- **[Class Transformer](https://github.com/typestack/class-transformer)** - Transformação de objetos

## 📊 Funcionalidades

### Entidade Participant

| Campo                 | Tipo   | Descrição                               |
| --------------------- | ------ | --------------------------------------- |
| `id`                  | UUID   | Identificador único                     |
| `fullName`            | String | Nome completo (3-50 caracteres)         |
| `age`                 | Number | Idade (mínimo 18 anos e máximo 30)      |
| `firstSemesterGrade`  | Number | Nota do primeiro semestre (0-10)        |
| `secondSemesterGrade` | Number | Nota do segundo semestre (0-10)         |
| `finalAverage`        | Number | Média final (calculada automaticamente) |

### Endpoints da API

#### 📝 Criar Participante

```http
POST /participant
Content-Type: application/json

{
  "fullName": "Índio medeiros",
  "age": 30,
  "firstSemesterGrade": 10,
  "secondSemesterGrade": 5
}
```

#### 📋 Listar Todos os Participantes

```http
GET /participant
```

#### 🔍 Buscar Participante por ID

```http
GET /participant/1681b549-216e-461d-8e78-344496d471e1
```

#### ✏️ Atualizar Participante

```http
PATCH /participant/53ebca58-04d5-473b-a513-1b105ecd8f11
Content-Type: application/json

{
  "fullName": "Chrislaine Souza"
}
```

#### 🗑️ Remover Participante

```http
DELETE /participant/1681b549-216e-461d-8e78-344496d471e1
```

#### **📊 Exemplo de Response com HATEOAS:**

```json
{
  "data": {
    "id": "7210bd27-3831-4e93-9700-808f313f7aba",
    "fullName": "Índio medeiros",
    "age": 30,
    "firstSemesterGrade": 10,
    "secondSemesterGrade": 1,
    "finalAverage": 5.5
  },
  "_links": [
    {
      "rel": "self",
      "href": "http://localhost:3000/participant/7210bd27-3831-4e93-9700-808f313f7aba",
      "method": "POST"
    },
    {
      "rel": "get",
      "href": "http://localhost:3000/participant/7210bd27-3831-4e93-9700-808f313f7aba",
      "method": "GET"
    },
    {
      "rel": "update",
      "href": "http://localhost:3000/participant/7210bd27-3831-4e93-9700-808f313f7aba",
      "method": "PATCH"
    },
    {
      "rel": "delete",
      "href": "http://localhost:3000/participant/7210bd27-3831-4e93-9700-808f313f7aba",
      "method": "DELETE"
    }
  ]
}
```

## 🛠️ Configuração e Instalação

### Pré-requisitos

- Node.js (versão 18 ou superior)
- MySQL (versão 8 ou superior)
- npm ou yarn

### Passos para Instalação

1. **Clone o repositório**

   ```bash
   git clone <url-do-repositorio>
   cd br-generation-challenge
   ```

2. **Instale as dependências**

   ```bash
   npm install
   ```

3. **Configure o banco de dados**
   - Crie um banco de dados MySQL com o nome `generation`
   - Configure as variáveis de ambiente (veja seção abaixo)

4. **Configure as variáveis de ambiente**
   Copie o arquivo `.env-example` para `.env` e configure as variáveis:

   ```bash
   cp .env-example .env
   ```

   Edite o arquivo `.env` com suas configurações:

   ```env
   # APPLICATION CONFIG
   PORT=3000

   # Database connection type (mysql, postgres, sqlite, etc.)
   DATABASE_TYPE=mysql

   # Database server configuration
   DATABASE_HOST=localhost
   DATABASE_PORT=3306

   # Database credentials
   DATABASE_USERNAME=root
   DATABASE_PASSWORD=sua_senha

   # Database name for the application
   DATABASE_DATABASE=generation

   # TypeORM settings
   DATABASE_AUTOLOADENTITIES=1
   DATABASE_SYNCHRONIZE=0
   ```

## 🏃‍♂️ Executando o Projeto

### Desenvolvimento

```bash
npm run start:dev
```

### Produção

```bash
npm run build
npm run start:prod
```

## 📝 Scripts Disponíveis

| Script                | Descrição                      |
| --------------------- | ------------------------------ |
| `npm run build`       | Compila o projeto              |
| `npm run start`       | Inicia o servidor              |
| `npm run start:dev`   | Inicia em modo desenvolvimento |
| `npm run start:debug` | Inicia em modo debug           |
| `npm run lint`        | Executa o linter               |
| `npm run format`      | Formata o código               |

## 🎯 Casos de Uso Implementados

1. **CreateParticipantUseCase** - Criação de novos participantes
2. **FindAllParticipantsUseCase** - Listagem de todos os participantes
3. **FindByIdParticipantUseCase** - Busca de participante por ID
4. **UpdateParticipantUseCase** - Atualização de dados do participante
5. **RemoveParticipantUseCase** - Remoção de participantes

## 🧮 Serviços de Domínio

### GradeCalculatorService

Responsável pelo cálculo da média final dos participantes:

- Calcula a média aritmética entre as notas dos dois semestres
- Fórmula: `(firstSemesterGrade + secondSemesterGrade) / 2`

## 🔍 Validações

### CreateParticipantDto

- **fullName**: String obrigatória, entre 3 e 50 caracteres
- **age**: Número obrigatório, mínimo 18 anos e máximo de 30 anos
- **firstSemesterGrade**: Número obrigatório, entre 0 e 10
- **secondSemesterGrade**: Número obrigatório, entre 0 e 10

### UpdateParticipantDto

- Todos os campos são opcionais
- Mesmas validações dos campos correspondentes no CreateParticipantDto

## 📋 Testes com client.rest

O projeto inclui um arquivo `client.rest` com exemplos de requisições HTTP para testar a API:

```http
@baseUrl = http://localhost:3000

### Create Participants
POST {{baseUrl}}/participant
Content-Type: application/json

{
  "fullName": "Índio medeiros",
  "age": 30,
  "firstSemesterGrade": 10,
  "secondSemesterGrade": 5
}

### Get All Participants
GET {{baseUrl}}/participant

### Get Participants by id
GET {{baseUrl}}/participant/1681b549-216e-461d-8e78-344496d471e1

### Update Participants by id
PATCH {{baseUrl}}/participant/53ebca58-04d5-473b-a513-1b105ecd8f11
Content-Type: application/json

{
  "fullName": "Chrislaine Souza"
}

### Delete Participants by id
DELETE {{baseUrl}}/participant/1681b549-216e-461d-8e78-344496d471e1
```

---

Desenvolvido como parte do desafio da Generation Brasil.

---
