import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
	getHello(): string {
		return 'Hello Fucking World!';
	}
}
console.log(
	'|| REST API para Banco de Dados com pré-processamento em SQLite ||',
);
