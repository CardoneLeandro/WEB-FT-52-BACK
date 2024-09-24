FROM node:20.11.0

WORKDIR /back

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3003

CMD ["npm", "run", "start"]