import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { PurchaseOrderService } from './purchase-order.service';
import { PurchaseOrder } from './purchase-order.model';
import { CreatePurchaseOrderDto } from './dto/create-purchase-order.dto';
import { UpdatePurchaseOrderDto } from './dto/update-purchase-order.dto';

@Controller('purchase-orders')
export class PurchaseOrderController {
  constructor(private readonly purchaseOrderService: PurchaseOrderService) {}

  @Post()
  create(
    @Body() createPurchaseOrderDto: CreatePurchaseOrderDto,
  ): Promise<PurchaseOrder> {
    return this.purchaseOrderService.create(createPurchaseOrderDto);
  }

  @Get()
  findAll(@Query('vendorId') vendorId?: string): Promise<PurchaseOrder[]> {
    return this.purchaseOrderService.findAll(vendorId);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<PurchaseOrder> {
    return this.purchaseOrderService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updatePurchaseOrderDto: UpdatePurchaseOrderDto,
  ): Promise<PurchaseOrder> {
    return this.purchaseOrderService.update(id, updatePurchaseOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.purchaseOrderService.remove(id);
  }
}
