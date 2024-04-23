import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { AuthModule } from '../auth/auth.module';
import { forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthGuard } from '../auth/guards/auth.guard';
import { Booking } from './entities/booking.entity';

@Module({
  controllers: [BookingController],
  providers: [BookingService],
  exports: [BookingService, TypeOrmModule],
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([Booking]),
  ]

})
export class BookingModule {}

