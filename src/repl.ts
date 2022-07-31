import { repl } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
	await repl(AppModule);
}
bootstrap();
console.log('REPL Iniciado com sucesso! Aguarde.');
