import { Injectable, NotFoundException } from '@nestjs/common';
import {v4 as uuid} from 'uuid'
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { Property } from './entities/property.entity';

@Injectable()
export class PropertyService {
  private properties: Property[] = []

  create(createPropertyDto: CreatePropertyDto) {
    try {
      
    } catch (error) {

    }
  }

  findAll(): Property[] {
    return this.properties;
  }

  findOne(id: string): Property {
    const property: Property = this.properties.find(prop => prop.id === id);

        // si no encuentra el car
        if (!property) {
            throw new NotFoundException(`Car with ID ${id} not found`);
        }

        return property;
  }

  update(id: string, updatePropertyDto: UpdatePropertyDto) {
    return `This action updates a #${id} property`;
  }

  remove(id: string) {
    return `This action removes a #${id} property`;
  }
}
