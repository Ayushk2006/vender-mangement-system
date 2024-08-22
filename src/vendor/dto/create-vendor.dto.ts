import { IsNotEmpty, IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateVendorDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  contactDetails?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsNotEmpty()
  @IsString()
  vendorCode: string;

  @IsOptional()
  @IsNumber()
  onTimeDeliveryRate?: number;

  @IsOptional()
  @IsNumber()
  qualityRatingAvg?: number;

  @IsOptional()
  @IsNumber()
  averageResponseTime?: number;

  @IsOptional()
  @IsNumber()
  fulfillmentRate?: number;
}
