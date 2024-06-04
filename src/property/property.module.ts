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

@Module({
  controllers: [PropertyController],
  providers: [PropertyService, FirebaseService, UserService],
  exports: [PropertyService, TypeOrmModule],
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([Property]),
    forwardRef(() => UserModule), // Utiliza forwardRef para referenciar a PropertyModule
  ],
})
export class PropertyModule {}
