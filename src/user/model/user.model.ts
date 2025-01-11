import { Field, Int, ObjectType } from '@nestjs/graphql';
import { PhotoDTO } from './photo.model';

@ObjectType()
export class UserDTO {
  @Field((type) => Int)
  id: number;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  isActive: boolean;

  @Field((type) => [PhotoDTO])
  photos: PhotoDTO[];
}
