FROM node 
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
ENV   DB_HOST="remotemysql.com"
ENV   DB_USER="EXalnYXJ4m"
ENV   DB_PASSWORD="QhuLsEwcFF"
ENV   DB_NAME="EXalnYXJ4m"
CMD ["npm", "start"]