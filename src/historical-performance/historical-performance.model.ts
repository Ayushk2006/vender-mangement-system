import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ulid } from 'ulid';

@Schema({ timestamps: true })
export class HistoricalPerformance {
  @Prop({ type: String, default: () => ulid(), unique: true, index: true })
  id: string;

  @Prop({ type: String, required: true })
  vendorId: string;

  @Prop({ type: Date, required: true })
  date: Date;

  @Prop({ type: Number, required: true })
  onTimeDeliveryRate: number;

  @Prop({ type: Number, required: true })
  qualityRatingAvg: number;

  @Prop({ type: Number, required: true })
  averageResponseTime: number;

  @Prop({ type: Number, required: true })
  fulfillmentRate: number;

  createdAt: Date;
  updatedAt: Date;
}

export const HISTORICAL_PERFORMANCE = 'HistoricalPerformance';
export const HistoricalPerformanceSchema = SchemaFactory.createForClass(
  HistoricalPerformance,
);
export type HistoricalPerformanceDocument = HistoricalPerformance & Document;
