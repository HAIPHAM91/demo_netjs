import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProductDTO, ProductParams } from './model/product.model';
import { ProductService } from 'src/sql/products/product.service';

@Resolver()
export class ProductResolver {
  constructor(private productService: ProductService) {}

  // Query to get all products
  @Query(() => [ProductDTO])
  async products(): Promise<ProductDTO[]> {
    return await this.productService.getAll();
  }

  // Query to get a single product by ID
  @Query(() => ProductDTO)
  async product(
    @Args({ name: 'id', type: () => Int }) id: number,
  ): Promise<ProductDTO> {
    return await this.productService.getOne(id);
  }

  // Mutation to create a new product
  @Mutation(() => ProductDTO)
  async createProduct(
    @Args({ name: 'product', type: () => ProductParams }) product: ProductParams,
  ): Promise<ProductDTO> {
    return this.productService.createProduct(product);
  }

  // Mutation to update an existing product
  @Mutation(() => ProductDTO)
  async updateProduct(
    @Args({ name: 'id', type: () => Int }) id: number,
    @Args({ name: 'product', type: () => ProductParams }) product: ProductParams,
  ): Promise<ProductDTO> {
    return this.productService.updateProduct(product, id);
  }

  // Mutation to delete a product by ID
  @Mutation(() => String)
  async deleteProduct(
    @Args({ name: 'id', type: () => Int }) id: number,
  ): Promise<string> {
    await this.productService.deleteProduct(id);
    return 'Product deleted successfully';
  }
}
