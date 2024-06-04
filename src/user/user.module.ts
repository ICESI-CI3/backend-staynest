import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AccountEntity } from './entities/account.entity';
import { BookingModule } from '../booking/booking.module';
import { PropertyModule } from 'src/property/property.module';


@Module({
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService, TypeOrmModule],
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([User, AccountEntity]),
    BookingModule,
    forwardRef(() => PropertyModule), // Utiliza forwardRef para referenciar a PropertyModule
  ],
})
export class UserModule {}
