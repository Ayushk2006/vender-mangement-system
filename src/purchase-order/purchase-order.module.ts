import { Module } from '@nestjs/common';
import { PurchaseOrderService } from './purchase-order.service';
import { PurchaseOrderController } from './purchase-order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PURCHASE_ORDER, PurchaseOrderSchema } from './purchase-order.model';
import { VendorModule } from 'src/vendor/vendor.module';
import {
  HISTORICAL_PERFORMANCE,
  HistoricalPerformanceSchema,
} from 'src/historical-performance/historical-performance.model';
import { VENDOR, VendorSchema } from 'src/vendor/vendor.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PURCHASE_ORDER, schema: PurchaseOrderSchema },
      { name: HISTORICAL_PERFORMANCE, schema: HistoricalPerformanceSchema },
      { name: VENDOR, schema: VendorSchema },
    ]),
    VendorModule,
  ],
  providers: [PurchaseOrderService],
  controllers: [PurchaseOrderController],
  exports: [PurchaseOrderService],
})
export class PurchaseOrderModule {}
