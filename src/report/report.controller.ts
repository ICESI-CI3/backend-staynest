import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReportService } from './report.service';


@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  

  @Get('oc')
  generateReport() {
    console.log('generating report');
    return this.reportService.generateOccupancyReport();
  }

  @Get('fr')
  generateFinancialReport() {
    return this.reportService.generateFinancialReport();
  }

  @Get('rc')
  generateRevenueByCity() {
    return this.reportService.generateRevenueByCityReport();
  }

  @Get('ua')
  generateUserActivityReport() {
    return this.reportService.generateUserActivityReport();
  }

  
}
