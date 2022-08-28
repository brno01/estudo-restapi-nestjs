import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'database',
      port: 5432,
      username: 'root',
      password: '0',
      database: 'cyan',
      logging: 'all',
      logger: 'advanced-console',
      autoLoadEntities: true,
      maxQueryExecutionTime: 1000,
      dropSchema: false,
      synchronize: true,
    }),
  ],
})
export class DatabaseModule { }
