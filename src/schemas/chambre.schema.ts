import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { mongoosePaginate } from 'mongoose-paginate-v2';

export type ChambreDocument = Chambre & Document;

@Schema()
export class Chambre {
  @Prop()
  name: string;

  @Prop()
  description: number;

  @Prop()
  host_name: string;

  @Prop()
  host_location: string;

  @Prop()
  picture_url: string;
}

export const ChambreSchema = SchemaFactory.createForClass(Chambre);
