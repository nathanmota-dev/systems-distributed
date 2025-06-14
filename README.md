# Plataforma de Videoaulas com Sistema Distribuído

Este projeto é uma plataforma de ensino online construída com Node.js, Fastify, RabbitMQ e Amazon S3, com banco de dados PostgreSQL realiza como trabalho final para a disciplina de Sistemas Distribuídos. A seguir está o guia completo para rodar e desenvolver a aplicação.

## Como rodar o projeto

### 1. Rodar o Backend
```bash
cd backend
npm install
npm run dev
```

### 2. Rodar o RabbitMQ
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

### 4. Rodar o Frontend
```bash
cd frontend
npm run dev
```

## Rotas do Backend

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

## Tecnologias Utilizadas
- **Node.js + Fastify**
- **RabbitMQ**
- **Amazon S3**
- **PostgreSQL + Neon.tech**
