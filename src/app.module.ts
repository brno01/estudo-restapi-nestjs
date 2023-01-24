import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { SpotModule } from './spot/spot.module';

@Module({
  imports: [
    AuthModule,
    ProductModule,
    UserModule,
    DatabaseModule,
    SpotModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
