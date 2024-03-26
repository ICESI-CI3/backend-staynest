import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PropertyModule } from './property/property.module';
import { BookingModule } from './booking/booking.module';
import { ManagementModule } from './management/management.module';

@Module({
  imports: [PropertyModule, BookingModule, ManagementModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
