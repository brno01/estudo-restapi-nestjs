import { Ip, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  //Fastify
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, {
    bufferLogs: true,
    cors: true,
  });
  new FastifyAdapter();

  // Pipes
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  //Swagger
  const config = new DocumentBuilder()
    .setTitle('Cyan API')
    .setDescription(
      'REST API para Banco de Dados com pré-processamento em SQLite',
    )
    .setVersion('0.1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  //Start
  await app.listen(process.env.NEST_PORT);
  console.log('API Iniciada com sucesso! ' + ' Running on port:', process.env.NEST_PORT);
}
bootstrap();
