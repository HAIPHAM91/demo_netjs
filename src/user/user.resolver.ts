import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserDTO, UserParams } from './model/user.model';
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

  @Query(() => UserDTO)
  async user(
    @Args({ name: 'id', type: () => Int }) id: number,
  ): Promise<UserDTO> {
    return await this.userService.getOne(id);
  }

  @Mutation(() => UserDTO)
  async createUser(
    @Args({ name: 'user', type: () => UserParams }) user: UserParams,
  ): Promise<UserDTO> {
    return  this.userService.createUser(user);
  }
}

  