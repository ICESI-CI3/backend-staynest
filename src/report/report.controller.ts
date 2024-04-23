import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReportService } from './report.service';


@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  

  @Get('occupancy')
  generateReport() {
    console.log('generating report');
    return this.reportService.generateOccupancyReport();
  }

  @Get('financial')
  generateFinancialReport() {
    return this.reportService.generateFinancialReport();
  }

  @Get('revenue-by-city')
  generateRevenueByCity() {
    return this.reportService.generateRevenueByCityReport();
  }

  @Get('user-activity')
  generateUserActivityReport() {
    return this.reportService.generateUserActivityReport();
  }

  
}
