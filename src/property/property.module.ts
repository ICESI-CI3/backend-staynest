import { Module } from '@nestjs/common';
import { PropertyService } from './property.service';
import { PropertyController } from './property.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Property } from './entities/property.entity';
import { AuthModule } from '../auth/auth.module';
import { AuthGuard } from '../auth/guards/auth.guard';
import { forwardRef } from '@nestjs/common';
import { FirebaseService } from './firebase.service';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { BookingService } from 'src/booking/booking.service';
import { BookingModule } from 'src/booking/booking.module';
@Module({
  controllers: [PropertyController],
  providers: [PropertyService, FirebaseService, UserService, BookingService],
  exports: [PropertyService, TypeOrmModule],
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([Property]),
    forwardRef(() => UserModule), 
    forwardRef(() => BookingModule), 
  ],
})
export class PropertyModule {}
