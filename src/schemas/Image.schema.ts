import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ImageDocument = Image & Document;

@Schema()
export class Image {
  @Prop()
  date: string;

  @Prop()
  imgName: string;

  @Prop()
  size: string;

  @Prop()
  analyse: [];
}

export const ImageSchema = SchemaFactory.createForClass(Image);
