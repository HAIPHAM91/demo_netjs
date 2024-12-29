import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { AboutController } from './about.controller';
import { UsersService } from './users/users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './users/user/user.module';
import { ProductModule } from './products/product/product.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/demo_server'),
    UserModule,
    ProductModule,
  ],
  controllers: [AppController, AboutController],
  providers: [AppService],
})
export class AppModule {}
