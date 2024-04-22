import { Module } from '@nestjs/common';
import { PropertyService } from './property.service';
import { PropertyController } from './property.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Property } from './entities/property.entity';

@Module({
  controllers: [PropertyController],
  providers: [PropertyService],
  // ORM para que funcione este modulo
  // y le decimos la entidad a trabajar
  imports: [
    TypeOrmModule.forFeature([Property]),
  ],
})
export class PropertyModule {}