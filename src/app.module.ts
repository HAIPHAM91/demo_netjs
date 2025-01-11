// import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { UsersController } from './users/users.controller';
// import { AboutController } from './about.controller';
// import { UsersService } from './users/users.service';
// import { MongooseModule } from '@nestjs/mongoose';
// import { UserModule } from './users/user/user.module';
// import { ProductModule } from './products/product/product.module';

// @Module({
//   imports: [
//     MongooseModule.forRoot('mongodb://127.0.0.1:27017/demo_server'),
//     UserModule,
//     ProductModule,
//   ],
//   controllers: [AppController, AboutController],
//   providers: [AppService],
// })
// export class AppModule {}
// eslint-disable-next-line prettier/prettier

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './sql/users/user.entity';
import { UsersModule } from './sql/users/user.module';
import { Photo } from './sql/photos/photo.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'demo_nestjs',
      entities: [User, Photo],
      synchronize: true,
    }),
    UsersModule,
  ],
})
export class AppModule {}
