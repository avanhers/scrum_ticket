import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: 4020
    }
  })

  await app.startAllMicroservicesAsync();
  await app.listen(3020);
  Logger.log('Ticket microservice running: listening on port 3020');
}
bootstrap();
