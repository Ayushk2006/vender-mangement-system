import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VendorModule } from './vendor/vendor.module';
import { PurchaseOrderModule } from './purchase-order/purchase-order.module';
import { HistoricalPerformanceModule } from './historical-performance/historical-performance.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    VendorModule,
    PurchaseOrderModule,
    HistoricalPerformanceModule,
    MongooseModule.forRoot(
      'mongodb+srv://aayush:aayush123@cluster0.vzrwn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
