import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CompaniesType = Companies & Document;

@Schema({
  timestamps: true,
  id: true,
})
export class Companies extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  email: string;

  @Prop()
  logo: string;

  @Prop()
  websiteUrl: string;

  _id: string;
}

export const CompaniesSchema = SchemaFactory.createForClass(Companies);
