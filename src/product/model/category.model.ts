import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ProductDTO } from './product.model';

@ObjectType()
export class CategoryDTO {
  @Field((type) => Int)
  id: number;

  @Field()
  name: string;

  @Field((type) => [ProductDTO])
  products?: ProductDTO[];
}
