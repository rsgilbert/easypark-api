FROM node:10

# app directory. This is now the current working directory in the docker container
WORKDIR /usr/src/app

COPY package*.json ./
RUN yarn install

# copy app source-code to docker container
COPY . .

# EXPOSE is not respected by heroku i.e. will not be considered
EXPOSE 3000

CMD ["node", "server.js"]

