# Usa uma imagem oficial do Node.js
FROM node:20-alpine

# Define diretório de trabalho dentro do container
WORKDIR /app

# Copia apenas os arquivos necessários para instalar dependências
COPY package.json package-lock.json* ./ 

# Instala as dependências
RUN npm install

# Usa uma imagem oficial do Node.js
FROM node:20-alpine

# Define diretório de trabalho dentro do container
WORKDIR /app

# Copia apenas os arquivos necessários para instalar dependências
COPY package.json package-lock.json* ./

# Instala as dependências
RUN npm install

# Copia o restante do código da aplicação
COPY . .

# Compila o TypeScript para JavaScript
RUN npm run build

# Expondo a porta que o Fastify escuta
EXPOSE 8080

# Comando para rodar o backend já compilado
CMD ["npm", "start"]