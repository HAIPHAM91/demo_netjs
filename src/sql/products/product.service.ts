import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { ProductDTO, ProductParams } from 'src/product/model/product.model';
import { Category } from '../categories/category.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  // Get all products
  async getAll(): Promise<ProductDTO[]> {
    const products = await this.productRepository.find({
      relations: ['category'],
    });
    return products.map(this.mapToDTO);
  }

  // Get product by ID
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

  // Create a new product
  async createProduct(productParams: ProductParams): Promise<ProductDTO> {
    const category = await this.categoryRepository.findOne({
      where: { id: productParams.category },
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

  // Update an existing product
  async updateProduct(productParams: ProductParams, id: number): Promise<ProductDTO> {
    const category = await this.categoryRepository.findOne({
      where: { id: productParams.category },
    });
    if (!category) {
      throw new Error('Category not found');
    }

    const updatedProduct = await this.productRepository.update(id, {
      ...productParams,
      category,
    });
    if (!updatedProduct) {
      throw new Error('Product not found');
    }

    return this.getOne(id);
  }

  // Delete a product by ID
  async deleteProduct(id: number): Promise<void> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new Error('Product not found');
    }
    await this.productRepository.delete(id);
  }

  // Helper method to map Product entity to ProductDTO
  private mapToDTO(product: Product): ProductDTO {
    return {
      id: product.id,
      name: product.name,
      price: product.price,
      description: product.description,
      category: product.category?.id || null,
    };
  }
}
