import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthModule } from 'src/app/log/health.module';
import { UserModule } from 'src/routes/user/user.module';
import { DatabaseModule } from 'src/app/database/database.module';

@Module({
	imports: [DatabaseModule, HealthModule, UserModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule { }
