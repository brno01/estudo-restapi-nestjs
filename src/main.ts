import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
    FastifyAdapter,
    NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app/app.module';

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(AppModule, {
        bufferLogs: true,
        cors: true,
    });
    new FastifyAdapter();

    app.useGlobalPipes(new ValidationPipe());

    const config = new DocumentBuilder()
        .setTitle('Cyan API')
        .setDescription(
            'REST API para Banco de Dados com pré-processamento em SQLite',
        )
        .setVersion('0.1.0')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('swagger', app, document);

    await app.listen(3000, '0.0.0.0');
    console.log('API Iniciada com sucesso!');
}
bootstrap();
