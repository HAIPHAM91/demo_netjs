import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ProductService } from './product.service';
// import { ProductDTO } from 'src/DTO/dto.product';
// import { ProductParams } from './product.model';

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  // Lấy danh sách tất cả sản phẩm
  @Get()
  async getAllProducts() {
    try {
      const products = await this.productService.getAll();
      return {
        statusCode: HttpStatus.OK,
        message: 'Lấy danh sách sản phẩm thành công!',
        data: products,
      };
    } catch (error) {
      throw new HttpException(
        { message: 'Lỗi khi lấy danh sách sản phẩm', error: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Lấy thông tin chi tiết một sản phẩm
  @Get(':id')
  async getProductById(@Param('id') id: number) {
    try {
      const product = await this.productService.getOne(id);
      if (!product) {
        throw new HttpException(
          { message: 'Sản phẩm không tồn tại!' },
          HttpStatus.NOT_FOUND,
        );
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'Lấy thông tin sản phẩm thành công!',
        data: product,
      };
    } catch (error) {
      throw new HttpException(
        { message: 'Lỗi khi lấy thông tin sản phẩm', error: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

//   // Tạo mới sản phẩm
//   @Post()
//   async createProduct(@Body() productParams: ProductParams) {
//     try {
//       const newProduct = await this.productService.createProduct(productParams);
//       return {
//         statusCode: HttpStatus.CREATED,
//         message: 'Tạo sản phẩm thành công!',
//         data: newProduct,
//       };
//     } catch (error) {
//       throw new HttpException(
//         { message: 'Lỗi khi tạo sản phẩm', error: error.message },
//         HttpStatus.INTERNAL_SERVER_ERROR,
//       );
//     }
//   }

//   // Cập nhật thông tin sản phẩm
//   @Put(':id')
//   async updateProduct(
//     @Param('id') id: number,
//     @Body() productParams: ProductParams,
//   ) {
//     try {
//       const updatedProduct = await this.productService.updateProduct(
//         productParams,
//         id,
//       );
//       return {
//         statusCode: HttpStatus.OK,
//         message: 'Cập nhật sản phẩm thành công!',
//         data: updatedProduct,
//       };
//     } catch (error) {
//       throw new HttpException(
//         { message: 'Lỗi khi cập nhật sản phẩm', error: error.message },
//         HttpStatus.INTERNAL_SERVER_ERROR,
//       );
//     }
//   }

  // Xóa sản phẩm
  @Delete(':id')
  async deleteProduct(@Param('id') id: number) {
    try {
      const deletedProduct = await this.productService.deleteProduct(id);
      return {
        statusCode: HttpStatus.OK,
        message: 'Xóa sản phẩm thành công!',
        data: deletedProduct,
      };
    } catch (error) {
      throw new HttpException(
        { message: 'Lỗi khi xóa sản phẩm', error: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
