import { Field, Int, ObjectType } from '@nestjs/graphql';
import { UserDTO } from './user.model';

@ObjectType()
export class PhotoDTO {
  @Field((type) => Int)
  id: number;

  @Field()
  url: string;

  @Field((type) => UserDTO)
  user: UserDTO;
}
