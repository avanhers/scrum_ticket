FROM node:lts

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install -g npm
RUN npm install
#RUN npm install --save-dev @nestjs/cli glob rimraf reflect-metadata @nestjs/microservices rxjs @nestjs/common @nestjs/core  @types/bcrypt  @nestjs/platform-express mongoose @nestjs/mongoose

COPY . .

RUN npm run build

CMD ["node", "dist/main"]
