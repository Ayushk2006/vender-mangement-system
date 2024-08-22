import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { VENDOR, Vendor, VendorDocument } from './vendor.model';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';
import {
  HISTORICAL_PERFORMANCE,
  HistoricalPerformance,
  HistoricalPerformanceDocument,
} from 'src/historical-performance/historical-performance.model';
import {
  PURCHASE_ORDER,
  PurchaseOrderDocument,
} from 'src/purchase-order/purchase-order.model';

@Injectable()
export class VendorService {
  constructor(
    @InjectModel(VENDOR) private readonly vendorModel: Model<VendorDocument>,
    @InjectModel(HISTORICAL_PERFORMANCE)
    private historicalPerformanceModel: Model<HistoricalPerformanceDocument>,
    @InjectModel(PURCHASE_ORDER)
    private purchaseOrderModel: Model<PurchaseOrderDocument>,
  ) {}

  async create(createVendorDto: CreateVendorDto): Promise<Vendor> {
    const vendor = new this.vendorModel(createVendorDto);
    return await vendor.save();
  }
  async findAll(): Promise<Vendor[]> {
    return await this.vendorModel.find().exec();
  }

  async findOne(vendorId: string): Promise<Vendor> {
    const vendor = await this.vendorModel.findById(vendorId).exec();
    if (!vendor) {
      throw new NotFoundException(`Vendor with ID ${vendorId} not found`);
    }
    return vendor;
  }

  async update(
    vendorId: string,
    updateVendorDto: UpdateVendorDto,
  ): Promise<Vendor> {
    const vendor = await this.vendorModel
      .findByIdAndUpdate(vendorId, updateVendorDto, {
        new: true,
      })
      .exec();

    if (!vendor) {
      throw new NotFoundException(`Vendor with ID ${vendorId} not found`);
    }
    return vendor;
  }

  async remove(vendorId: string): Promise<void> {
    const vendor = await this.vendorModel.findByIdAndDelete(vendorId).exec();
    if (!vendor) {
      throw new NotFoundException(`Vendor with ID ${vendorId} not found`);
    }
  }

  async getVendorPerformance(vendorId: string): Promise<HistoricalPerformance> {
    const vendor = await this.vendorModel.findById(vendorId).exec();
    if (!vendor) {
      throw new NotFoundException(`Vendor with ID ${vendorId} not found`);
    }
    const performance = await this.historicalPerformanceModel
      .findOne({ vendorId })
      .sort({ date: -1 })
      .exec();

    if (!performance) {
      throw new NotFoundException(
        `No performance metrics found for vendor with ID ${vendorId}`,
      );
    }
    return performance;
  }

  async updateOnTimeDeliveryRate(vendorId: string): Promise<void> {
    const completedPOs = await this.purchaseOrderModel
      .find({ vendorId, status: 'completed' })
      .exec();

    const totalCompleted = completedPOs.length;
    const onTimeCount = completedPOs.filter(
      (po) => po.deliveryDate && po.deliveryDate <= po.issueDate,
    ).length;

    const onTimeDeliveryRate =
      totalCompleted > 0 ? (onTimeCount / totalCompleted) * 100 : 0;

    await this.vendorModel.findByIdAndUpdate(vendorId, { onTimeDeliveryRate });
  }

  async updateQualityRatingAvg(vendorId: string): Promise<void> {
    const completedPOs = await this.purchaseOrderModel
      .find({ vendorId, status: 'completed', qualityRating: { $ne: null } })
      .exec();

    const totalRating = completedPOs.reduce(
      (sum, po) => sum + (po.qualityRating || 0),
      0,
    );
    const averageQualityRating =
      completedPOs.length > 0 ? totalRating / completedPOs.length : 0;

    await this.vendorModel.findByIdAndUpdate(vendorId, {
      qualityRatingAvg: averageQualityRating,
    });
  }

  async updateAverageResponseTime(vendorId: string): Promise<void> {
    const acknowledgedPOs = await this.purchaseOrderModel
      .find({ vendorId, acknowledgmentDate: { $ne: null } })
      .exec();

    const totalResponseTime = acknowledgedPOs.reduce(
      (sum, po) =>
        sum + (po.acknowledgmentDate!.getTime() - po.issueDate.getTime()),
      0,
    );

    const averageResponseTime =
      acknowledgedPOs.length > 0
        ? totalResponseTime / acknowledgedPOs.length
        : 0;

    await this.vendorModel.findByIdAndUpdate(vendorId, { averageResponseTime });
  }

  async updateFulfillmentRate(vendorId: string): Promise<void> {
    const allPOs = await this.purchaseOrderModel.find({ vendorId }).exec();
    const completedPOs = allPOs.filter((po) => po.status === 'completed');
    const fulfilledPOs = completedPOs.filter((po) => po.qualityRating !== null); // Assuming non-null qualityRating means fulfilled

    const fulfillmentRate =
      allPOs.length > 0 ? (fulfilledPOs.length / allPOs.length) * 100 : 0;

    await this.vendorModel.findByIdAndUpdate(vendorId, { fulfillmentRate });
  }
}
