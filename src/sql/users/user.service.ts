import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Like } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  getAll(): Promise<User[]> {
    return this.usersRepository.find({
      relations: {
        photos: true,
      },
    });
  }

  getOne(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  createUser(user) {
    return this.usersRepository.save([user, user]);
  }

  updateUser(user, id) {
    return this.usersRepository.update(id, user);
  }

  deleteUser(id) {
    return this.usersRepository.delete(id);
  }
}
