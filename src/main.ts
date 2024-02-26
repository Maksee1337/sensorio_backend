import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import configuration from './core/config/configuration';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const config = configuration();
  await app.listen(config.port);
}
bootstrap();
