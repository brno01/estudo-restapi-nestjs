import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: 'localhost',
			port: 5432,
			username: 'root',
			password: '0',
			database: 'cyan',
			logging: 'all',
			logger: 'advanced-console',
			synchronize: true,
			autoLoadEntities: true,
			maxQueryExecutionTime: 1000,
		}),
	],
})
export class DatabaseModule {}
