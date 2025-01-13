import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductResolver } from 'src/product/product.resolver';
import { Category } from '../categories/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Category])],  // Import cả Product và Category entity
  providers: [ProductService, ProductResolver],
  controllers: [ProductController],
})
export class ProductsModule {}
