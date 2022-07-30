import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthModule } from './health/health.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      database: 'cyan',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      logging: true,
      logger: 'advanced-console',
      dropSchema: false,
      entities: [
        __dirname + '/**/*.entity{.ts,.js}'
      ],

      synchronize: true,
    }),
    HealthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
console.log('Iniciado com sucesso! Aguarde.');
