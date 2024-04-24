import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReportService } from './report.service';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';

@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  

  @Get('occupancy')
  generateReport() {
    console.log('generating report');
    return this.reportService.generateOccupancyReport();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReportDto: UpdateReportDto) {
    return this.reportService.update(+id, updateReportDto);
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
