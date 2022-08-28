import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      logging: 'all',
      logger: 'advanced-console',
      autoLoadEntities: true,
      maxQueryExecutionTime: 1000,
      dropSchema: false,
      synchronize: process.env.DB_SYNC == 'true',
    }),
  ],
})
export class DatabaseModule { }
