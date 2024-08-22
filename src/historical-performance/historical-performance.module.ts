import { Module } from '@nestjs/common';
import { HistoricalPerformanceService } from './historical-performance.service';
import { HistoricalPerformanceController } from './historical-performance.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  HISTORICAL_PERFORMANCE,
  HistoricalPerformanceSchema,
} from './historical-performance.model';
import {
  PURCHASE_ORDER,
  PurchaseOrderSchema,
} from 'src/purchase-order/purchase-order.model';
import { VENDOR, VendorSchema } from 'src/vendor/vendor.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PURCHASE_ORDER, schema: PurchaseOrderSchema },
      { name: HISTORICAL_PERFORMANCE, schema: HistoricalPerformanceSchema },
      { name: VENDOR, schema: VendorSchema },
    ]),
  ],
  providers: [HistoricalPerformanceService],
  controllers: [HistoricalPerformanceController],
})
export class HistoricalPerformanceModule {}
