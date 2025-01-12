import { Field, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ProductDTO {
  @Field()
  id: number;

  @Field()
  name: string;

  @Field()
  price: number;

  @Field()
  description: string;

  @Field()
  categoryId: number; 
}


@InputType()
export class ProductParams {
  @Field()
  name: string;

  @Field()
  price: number;

  @Field()
  description: string;

  @Field()
  categoryId: number;
}
