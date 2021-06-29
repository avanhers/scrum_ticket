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
      port: 4000
    }
  })

  await app.startAllMicroservicesAsync();
  await app.listen(3010);
  Logger.log('Auth microservice running: listening on port 3010');
}
bootstrap();
