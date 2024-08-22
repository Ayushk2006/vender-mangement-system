import { Module } from '@nestjs/common';
import { VendorService } from './vendor.service';
import { VendorController } from './vendor.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { VENDOR, VendorSchema } from './vendor.model';
import {
  PURCHASE_ORDER,
  PurchaseOrderSchema,
} from 'src/purchase-order/purchase-order.model';
import {
  HISTORICAL_PERFORMANCE,
  HistoricalPerformanceSchema,
} from 'src/historical-performance/historical-performance.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PURCHASE_ORDER, schema: PurchaseOrderSchema },
      { name: HISTORICAL_PERFORMANCE, schema: HistoricalPerformanceSchema },
      { name: VENDOR, schema: VendorSchema },
    ]),
  ],
  providers: [VendorService],
  controllers: [VendorController],
  exports: [VendorService],
})
export class VendorModule {}
