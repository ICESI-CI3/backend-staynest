import { Module, forwardRef } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';

@Module({
  controllers: [BookingController],
  providers: [BookingService],
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([Booking]),
  ],
})
export class BookingModule {}