import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  HISTORICAL_PERFORMANCE,
  HistoricalPerformance,
  HistoricalPerformanceDocument,
} from './historical-performance.model';
import {
  PURCHASE_ORDER,
  PurchaseOrderDocument,
} from 'src/purchase-order/purchase-order.model';

@Injectable()
export class HistoricalPerformanceService {
  constructor(
    @InjectModel(HISTORICAL_PERFORMANCE)
    private historicalPerformanceModel: Model<HistoricalPerformanceDocument>,
    @InjectModel(PURCHASE_ORDER)
    private purchaseOrderModel: Model<PurchaseOrderDocument>,
  ) {}

  async calculateAndSaveHistoricalPerformance(
    vendorId: string,
    date: Date,
  ): Promise<HistoricalPerformance> {
    const purchaseOrders = await this.purchaseOrderModel
      .find({ vendorId })
      .exec();

    if (!purchaseOrders || purchaseOrders.length === 0) {
      throw new NotFoundException(
        `No purchase orders found for vendor with ID ${vendorId}`,
      );
    }

    const totalOrders = purchaseOrders.length;

    const onTimeDeliveries = purchaseOrders.filter(
      (po) => po.deliveryDate && po.deliveryDate <= po.orderDate,
    ).length;
    const onTimeDeliveryRate = (onTimeDeliveries / totalOrders) * 100;

    const qualityRatings = purchaseOrders
      .map((po) => po.qualityRating)
      .filter((rating) => rating !== null);
    const qualityRatingAvg =
      qualityRatings.reduce((sum, rating) => sum + rating, 0) /
        qualityRatings.length || 0;

    const responseTimes = purchaseOrders
      .map((po) =>
        po.acknowledgmentDate
          ? po.acknowledgmentDate.getTime() - po.issueDate.getTime()
          : null,
      )
      .filter((time) => time !== null);
    const averageResponseTime =
      responseTimes.reduce((sum, time) => sum + time, 0) /
        responseTimes.length || 0;

    const fulfilledOrders = purchaseOrders.filter(
      (po) => po.status === 'completed',
    ).length;
    const fulfillmentRate = (fulfilledOrders / totalOrders) * 100;

    const historicalPerformance = new this.historicalPerformanceModel({
      vendorId,
      date,
      onTimeDeliveryRate,
      qualityRatingAvg,
      averageResponseTime,
      fulfillmentRate,
    });

    return historicalPerformance.save();
  }
}
