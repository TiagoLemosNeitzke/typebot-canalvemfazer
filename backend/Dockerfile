# Escolher a imagem base (Node.js, ou outro que seu backend utilize)
FROM node:16

# Definir o diretório de trabalho
WORKDIR /usr/src/app

# Copiar os arquivos do projeto para o contêiner
COPY package*.json ./

# Instalar as dependências
RUN npm install

# Copiar o restante do projeto
COPY . .

# Expor a porta usada pelo backend
EXPOSE 8080

# Iniciar o servidor
CMD ["npm", "run", "start"]
