import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  PURCHASE_ORDER,
  PurchaseOrder,
  PurchaseOrderDocument,
} from './purchase-order.model';
import { CreatePurchaseOrderDto } from './dto/create-purchase-order.dto';
import { UpdatePurchaseOrderDto } from './dto/update-purchase-order.dto';
import { VendorService } from 'src/vendor/vendor.service';

@Injectable()
export class PurchaseOrderService {
  constructor(
    @InjectModel(PURCHASE_ORDER)
    private purchaseOrderModel: Model<PurchaseOrderDocument>,
    private readonly vendorService: VendorService,
  ) {}

  async create(
    createPurchaseOrderDto: CreatePurchaseOrderDto,
  ): Promise<PurchaseOrder> {
    const newPO = new this.purchaseOrderModel(createPurchaseOrderDto);
    return newPO.save();
  }

  async findAll(vendorId?: string): Promise<PurchaseOrder[]> {
    const filter = vendorId ? { vendorId } : {};
    return this.purchaseOrderModel.find(filter).exec();
  }

  async findOne(id: string): Promise<PurchaseOrder> {
    const po = await this.purchaseOrderModel.findById(id).exec();
    if (!po) {
      throw new NotFoundException(`Purchase Order with ID ${id} not found`);
    }
    return po;
  }

  async update(
    id: string,
    updatePurchaseOrderDto: UpdatePurchaseOrderDto,
  ): Promise<PurchaseOrder> {
    const updatedPO = await this.purchaseOrderModel
      .findByIdAndUpdate(id, updatePurchaseOrderDto, { new: true })
      .exec();
    if (!updatedPO) {
      throw new NotFoundException(`Purchase Order with ID ${id} not found`);
    }
    await this.vendorService.updateOnTimeDeliveryRate(
      updatePurchaseOrderDto.vendorId,
    );
    await this.vendorService.updateQualityRatingAvg(
      updatePurchaseOrderDto.vendorId,
    );
    await this.vendorService.updateAverageResponseTime(
      updatePurchaseOrderDto.vendorId,
    );
    await this.vendorService.updateFulfillmentRate(
      updatePurchaseOrderDto.vendorId,
    );
    return updatedPO;
  }

  async remove(id: string): Promise<void> {
    const result = await this.purchaseOrderModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Purchase Order with ID ${id} not found`);
    }
  }
}
