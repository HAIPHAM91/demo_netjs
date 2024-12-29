import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Params } from 'src/interface/params';
import { UsersService } from './users.service';
import { dtoUser } from 'src/DTO/dto.user';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  async index(@Res() res: Response) {
    try {
      const users = await this.userService.getAll();
      res
        .status(200)
        .json({ message: 'Lấy dữ liệu thành công!!', datas: users });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  @Get('detail/:id')
  async details(@Param() params: Params, @Res() res: Response) {
    const id = String(params.id);
    try {
      const user = await this.userService.detail(id);
      res
        .status(200)
        .json({ message: 'Lấy dữ liệu thành công!!', datas: user });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  @Delete('/delete/:id')
  async delete(@Res() res: Response, @Req() request: Request) {
    const id = request.params.id;
    try {
      const data = await this.userService.deleteUser(id);
      res.status(200).json({ message: 'Xoa thanh cong!!', datas: data });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
  @Post('create')
  async create(@Res() res: Response, @Body() body: dtoUser) {
    try {
      const data = await this.userService.createUser(body);
      res.status(200).json({ message: 'Tao moi thanh cong!!', datas: data });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
  @Put('update/:id')
  async update(
    @Param() params: Params,
    @Res() res: Response,
    @Body() body: dtoUser,
  ) {
    const id = String(params.id);
    try {
      const data = await this.userService.updateUser(body, id);
      res.status(200).json({ message: 'Update thanh cong!!', datas: data });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}
// get
// post
// put
// patch
// delete
