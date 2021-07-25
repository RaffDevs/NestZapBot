import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);

  app.use('/downloads', express.static('../media/downloads'));
  app.use('/uploads', express.static('../media/uploads'));
}
bootstrap();
