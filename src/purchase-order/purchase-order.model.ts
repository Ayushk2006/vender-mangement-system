import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ulid } from 'ulid';

@Schema({ timestamps: true })
export class PurchaseOrder {
  @Prop({ type: String, default: () => ulid(), unique: true, index: true })
  id: string;

  @Prop({ required: true, unique: true })
  poNumber: string;

  @Prop({ type: String, required: true })
  vendorId: string;

  @Prop({ type: Date, required: true })
  orderDate: Date;

  @Prop({ type: Date })
  deliveryDate: Date;

  @Prop({ type: Object, required: true })
  items: Record<string, any>;

  @Prop({ type: Number, required: true })
  quantity: number;

  @Prop({
    type: String,
    required: true,
    enum: ['pending', 'completed', 'canceled'],
    default: 'pending',
  })
  status: string;

  @Prop({ type: Number, default: null })
  qualityRating: number;

  @Prop({ type: Date, required: true })
  issueDate: Date;

  @Prop({ type: Date, default: null })
  acknowledgmentDate: Date | null;

  createdAt: Date;
  updatedAt: Date;
}

export const PURCHASE_ORDER = 'PurchaseOrder';
export const PurchaseOrderSchema = SchemaFactory.createForClass(PurchaseOrder);
export type PurchaseOrderDocument = PurchaseOrder & Document;
