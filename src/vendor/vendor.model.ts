import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ulid } from 'ulid';

@Schema({ timestamps: true })
export class Vendor {
  @Prop({ type: String, default: () => ulid(), unique: true, index: true })
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  contactDetails: string;

  @Prop()
  address: string;

  @Prop({ unique: true })
  vendorCode: string;

  @Prop({ type: Number, default: 0 })
  onTimeDeliveryRate: number;

  @Prop({ type: Number, default: 0 })
  qualityRatingAvg: number;

  @Prop({ type: Number, default: 0 })
  averageResponseTime: number;

  @Prop({ type: Number, default: 0 })
  fulfillmentRate: number;

  createdAt: Date;
  updatedAt: Date;
}

export const VENDOR = 'Vendor';
export const VendorSchema = SchemaFactory.createForClass(Vendor);
export type VendorDocument = Vendor & Document;
