import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema({ timestamps: true })
export class Product {
  @Prop()
  name: string;

  @Prop()
  price: number;

  @Prop()
  description: string;

  // Thêm khóa ngoại liên kết đến bảng categories
  @Prop({ type: Types.ObjectId, ref: 'Category' }) 
  categoryId: Types.ObjectId; 
}

export const ProductSchema = SchemaFactory.createForClass(Product);
