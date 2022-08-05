import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from 'src/user/user.module';
import { DatabaseModule } from 'src/database/database.module';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [
        AuthModule,
        DatabaseModule,
        UserModule
    ],
    controllers: [
        AppController
    ],
    providers: [
        AppService
    ],
})
export class AppModule { }
