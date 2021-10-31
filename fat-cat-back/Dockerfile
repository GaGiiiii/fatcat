FROM node:14 
RUN npm i -g nodemon
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
EXPOSE 8000
CMD ["npm", "start"]