import { Body, Controller, Post } from '@nestjs/common';
import { HistoricalPerformanceService } from './historical-performance.service';
import { HistoricalPerformance } from './historical-performance.model';

@Controller('historical-performance')
export class HistoricalPerformanceController {
  constructor(
    private readonly historicalPerformanceService: HistoricalPerformanceService,
  ) {}

  @Post()
  calculateAndSave(
    @Body('vendorId') vendorId: string,
    @Body('date') date: Date,
  ): Promise<HistoricalPerformance> {
    return this.historicalPerformanceService.calculateAndSaveHistoricalPerformance(
      vendorId,
      date,
    );
  }
}
