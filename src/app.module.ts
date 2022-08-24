import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { OrderModule } from './order/order.module';

@Module({
    imports: [
        AuthModule,
        ProductModule,
        UserModule,
        DatabaseModule,
        OrderModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
