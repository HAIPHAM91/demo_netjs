import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { ProductDTO, ProductParams } from 'src/products/model/product.model';
import { Category } from '../categories/category.entity'; // Nếu có category entity

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  // Lấy tất cả sản phẩm và ánh xạ sang DTO
  async getAll(): Promise<ProductDTO[]> {
    const products = await this.productRepository.find({ relations: ['category'] });
    return products.map((product) => this.mapToDTO(product));
  }

  // Lấy chi tiết sản phẩm theo id và ánh xạ sang DTO
  async getOne(id: number): Promise<ProductDTO> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['category'],
    });
    if (!product) {
      throw new Error('Product not found');
    }
    return this.mapToDTO(product);
  }

  // Tạo sản phẩm mới và trả về DTO
  async createProduct(productParams: ProductParams): Promise<ProductDTO> {
    const category = await this.categoryRepository.findOne({
      where: { id: productParams.categoryId },
    });
    if (!category) {
      throw new Error('Category not found');
    }

    const product = this.productRepository.create({
      name: productParams.name,
      price: productParams.price,
      description: productParams.description,
      category,
    });

    const savedProduct = await this.productRepository.save(product);
    return this.mapToDTO(savedProduct);
  }

  // Ánh xạ từ entity Product sang DTO
  private mapToDTO(product: Product): ProductDTO {
    return {
      id: product.id,
      name: product.name,
      price: product.price,
      description: product.description,
      categoryId: product.category?.id || null, // categoryId lấy từ quan hệ category
    };
  }
}