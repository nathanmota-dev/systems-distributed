# EduStream - Plataforma de Videoaulas com Sistema Distribuído

Este projeto é uma plataforma de ensino online construída com Node.js, Fastify, RabbitMQ e Amazon S3, com banco de dados PostgreSQL realiza como trabalho final para a disciplina de Sistemas Distribuídos. A seguir está o guia completo para rodar e desenvolver a aplicação.

## 🔧 Como rodar o projeto

### 1. Rodar o Backend
```bash
npm install
npm run dev
```

### 2. Rodar o RabbitMQ (requisito para filas de eventos)
```bash
docker run -d \
  --hostname rabbitmq \
  --name rabbitmq \
  -p 5672:5672 \
  -p 15672:15672 \
  rabbitmq:3-management
```
Acesse o painel do RabbitMQ:
- URL: http://localhost:15672/
- Usuário: `guest`
- Senha: `guest`

### 3. Rodar o Worker (Consumidor do RabbitMQ)
```bash
npm run worker
```


## 🔄 Rotas do Backend (API)

| Endpoint                     | Método | Descrição                                      |
|-----------------------------|--------|------------------------------------------------|
| `/auth/teacher/register`    | POST   | Cadastro de professor                          |
| `/auth/teacher/login`       | POST   | Login do professor                             |
| `/auth/student/register`    | POST   | Cadastro de aluno                              |
| `/auth/student/login`       | POST   | Login do aluno                                 |
| `/courses`                  | GET    | Listagem de cursos                             |
| `/courses`                  | POST   | Criação de um novo curso                       |
| `/videos/presign`           | POST   | Geração de URL assinada para upload no S3      |
| `/videos/confirm-upload`    | POST   | Confirmação do upload e registro de metadados  |

---

## 🧭 Rotas do Frontend

Estas são as rotas acessíveis para usuários na aplicação frontend:

| Rota do Frontend       | Descrição                                                   | Backend Consumido              |
|------------------------|-------------------------------------------------------------|--------------------------------|
| `/`                    | Página inicial que lista todos os cursos                    | `GET /courses`                 |
| `/teacher/register`    | Tela de cadastro de professores                             | `POST /auth/teacher/register`  |
| `/teacher/login`       | Tela de login do professor                                  | `POST /auth/teacher/login`     |
| `/student/register`    | Tela de cadastro de alunos                                  | `POST /auth/student/register`  |
| `/student/login`       | Tela de login do aluno                                      | `POST /auth/student/login`     |
| `/create-course`       | Tela para criação de cursos (professor autenticado)         | `POST /courses`                |
| `/upload`              | Tela de upload de vídeo (gera presigned URL e envia vídeo)  | `POST /videos/presign`         |

## 🚀 Tecnologias Utilizadas
- **Node.js + Fastify** (API e servidor HTTP)
- **RabbitMQ** (Mensageria e processamento assíncrono)
- **Amazon S3** (Armazenamento de arquivos)
- **PostgreSQL** (Banco de dados relacional em nuvem)