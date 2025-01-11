import { Query, Resolver } from '@nestjs/graphql';
import { UserDTO } from './model/user.model';
import { UserService } from 'src/sql/users/user.service';

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}
  @Query(() => [UserDTO])
  async users(): Promise<UserDTO[]> {
    return await this.userService.getAll();
  }

  @Query(() => String)
  async products() {
    return 'Hello Products';
  }
}
