import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { VendorService } from './vendor.service';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';
import { Vendor } from './vendor.model';
import { HistoricalPerformance } from 'src/historical-performance/historical-performance.model';

@Controller('vendors')
export class VendorController {
  constructor(private readonly vendorService: VendorService) {}

  @Post()
  async create(@Body() createVendorDto: CreateVendorDto): Promise<Vendor> {
    return await this.vendorService.create(createVendorDto);
  }

  @Get()
  async findAll(): Promise<Vendor[]> {
    return await this.vendorService.findAll();
  }

  @Get(':vendorId')
  async findOne(@Param('vendorId') vendorId: string): Promise<Vendor> {
    return await this.vendorService.findOne(vendorId);
  }

  @Put(':vendorId')
  async update(
    @Param('vendorId') vendorId: string,
    @Body() updateVendorDto: UpdateVendorDto,
  ): Promise<Vendor> {
    return await this.vendorService.update(vendorId, updateVendorDto);
  }

  @Delete(':vendorId')
  async remove(@Param('vendorId') vendorId: string): Promise<void> {
    return await this.vendorService.remove(vendorId);
  }

  @Get(':vendorId/performance')
  async getVendorPerformance(
    @Param('vendorId') vendorId: string,
  ): Promise<HistoricalPerformance> {
    return this.vendorService.getVendorPerformance(vendorId);
  }
}
