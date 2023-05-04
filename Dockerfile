FROM  node:alpine

WORKDIR /app

# Copy package.json and package-lock.json And ENV
COPY package*.json ./

COPY .env ./

EXPOSE 3000

RUN npm install

COPY . .


CMD node app.js

