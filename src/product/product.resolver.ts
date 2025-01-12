import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'; 
import { ProductDTO, ProductParams } from '../products/model/product.model'; 
import { ProductService } from '../products/products.service';

@Resolver()
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  // Query: Lấy danh sách sản phẩm
  @Query(() => [ProductDTO])
  async products(): Promise<ProductDTO[]> {
    return await this.productService.getAll();
  }

  // Query: Lấy thông tin chi tiết sản phẩm
  @Query(() => ProductDTO)
  async product(
    @Args({ name: 'id', type: () => Int }) id: number,
  ): Promise<ProductDTO> {
    return await this.productService.getOne(id);
  }

  // Mutation: Tạo sản phẩm mới
  @Mutation(() => ProductDTO)
  async createProduct(
    @Args({ name: 'product', type: () => ProductParams }) product: ProductParams,
  ): Promise<ProductDTO> {
    return await this.productService.createProduct(product);
  }
}
