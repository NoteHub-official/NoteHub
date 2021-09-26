FROM node:lts-alpine
WORKDIR /server
COPY package*.json ./
RUN npm install
COPY . . 
CMD [ "npm", "run","watch" ]