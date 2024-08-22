import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreatePurchaseOrderDto {
  @IsString()
  @IsNotEmpty()
  poNumber: string;

  @IsString()
  @IsNotEmpty()
  vendorId: string;

  @IsDateString()
  @IsNotEmpty()
  orderDate: Date;

  @IsDateString()
  @IsOptional()
  deliveryDate?: Date;

  @IsNotEmpty()
  items: Record<string, any>;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @IsEnum(['pending', 'completed', 'canceled'])
  @IsNotEmpty()
  status: string;

  @IsNumber()
  @IsOptional()
  qualityRating?: number;

  @IsDateString()
  @IsNotEmpty()
  issueDate: Date;

  @IsDateString()
  @IsOptional()
  acknowledgmentDate?: Date | null;
}
