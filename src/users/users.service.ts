import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/user.schema';
import { Model } from 'mongoose';
import { dtoUser } from 'src/DTO/dto.user';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async detail(id: string) {
    const user = await this.userModel.findById(id);
    return user;
  }

  async getAll(): Promise<User[]> {
    const users = await this.userModel.find({});
    return users;
  }

  async deleteUser(id: string) {
    const data = await this.userModel.findByIdAndDelete(id);
    return data;
  }

  async createUser(user: dtoUser) {
    const data = await this.userModel.create(user);
    return data;
  }
  async updateUser(user: dtoUser, id: string) {
    const data = await this.userModel.findByIdAndUpdate(id, user);
    return data;
  }
}
