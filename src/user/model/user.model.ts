import { Field, Int, ObjectType } from '@nestjs/graphql';
import { PhotoDTO } from './photo.model';
import { InputType} from '@nestjs/graphql';

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
@InputType()
export class UserParams {
  @Field()
  firstName: string;
  @Field()
  lastName: string;
}