FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./
COPY prisma ./

RUN npm install

COPY . .

ENV NODE_ENV="production"
ENV DATABASE_URL="postgres://fyywatoxiijrhu:8e5a32c41c1235750f49120b2738705bfc882c465b71aaf9326e74fe8f9311b8@ec2-52-1-115-6.compute-1.amazonaws.com:5432/dd7imus2v53uc1"

EXPOSE 3000
EXPOSE 5432

CMD [ "npm", "start" ]