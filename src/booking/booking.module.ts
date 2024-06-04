import { Module, forwardRef } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { AuthModule } from '../auth/auth.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthGuard } from '../auth/guards/auth.guard';
import { Booking } from './entities/booking.entity';
import { UserModule } from 'src/user/user.module';
import { User } from '../user/entities/user.entity';
import { Property } from '../property/entities/property.entity';
import { UserService } from 'src/user/user.service';

@Module({
  controllers: [BookingController],
  providers: [BookingService, UserService],
  exports: [BookingService, TypeOrmModule],
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([Booking, User, Property]),
    forwardRef(() => UserModule), // Utiliza forwardRef para referenciar a PropertyModule
  ]

})
export class BookingModule {}