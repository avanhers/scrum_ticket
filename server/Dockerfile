FROM node:lts

WORKDIR /app
ADD . .
RUN npm install

WORKDIR /app/UserService/
RUN npm install
RUN npm run build

WORKDIR /app/AuthService/
RUN npm install
RUN npm run build

WORKDIR /app
CMD npm run start