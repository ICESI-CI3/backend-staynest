import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PropertyModule } from './property/property.module';
import { BookingModule } from './booking/booking.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ReportsModule } from './reports/reports.module';

@Module({
  imports: [PropertyModule, BookingModule, UserModule, AuthModule, ReportsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
