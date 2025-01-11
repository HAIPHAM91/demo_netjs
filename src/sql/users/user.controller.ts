import {
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  // Lấy danh sách tất cả người dùng
  @Get()
  async getAllUsers() {
    try {
      const users = await this.userService.getAll();
      return {
        statusCode: HttpStatus.OK,
        message: 'Lấy danh sách người dùng thành công!',
        data: users,
      };
    } catch (error) {
      throw new HttpException(
        { message: 'Lỗi khi lấy danh sách người dùng', error: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Lấy thông tin chi tiết một người dùng
  @Get(':id')
  async getUserById(@Param('id') id: number) {
    try {
      const user = await this.userService.getOne(id);
      if (!user) {
        throw new HttpException(
          { message: 'Người dùng không tồn tại!' },
          HttpStatus.NOT_FOUND,
        );
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'Lấy thông tin người dùng thành công!',
        data: user,
      };
    } catch (error) {
      throw new HttpException(
        { message: 'Lỗi khi lấy thông tin người dùng', error: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post()
  async createUser() {
    const userParam = {
      firstName: 'Nguyen',
      lastName: 'Van A',
    };
    const user = await this.userService.createUser(userParam);
    return user;
  }
  @Put()
  async updateUser() {
    const userParam = {
      firstName: 'Tran',
      lastName: 'Thi B',
    };
    const user = await this.userService.updateUser(userParam, 2);
    return user;
  }
  // @Delete()
  // deleteUser() {
  //   const user = this.userService.deleteUser([2, 3, 4]);
  //   return user;
  // }
}
