import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use('/downloads', express.static('../media/downloads'));
  app.use('/uploads', express.static('../media/uploads'));
  await app.listen(5000);

}
bootstrap();
