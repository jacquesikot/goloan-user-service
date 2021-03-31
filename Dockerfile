FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./
COPY prisma ./

RUN npm install

COPY . .

ENV NODE_ENV="production"

EXPOSE 3000
EXPOSE 5432

CMD [ "npm", "start" ]