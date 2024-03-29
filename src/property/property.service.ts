import { Injectable, NotFoundException } from '@nestjs/common';
import {v4 as uuid} from 'uuid'
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { Property } from './entities/property.entity';
import { Location } from '../aux_entities/location.entity';
import { PropertyType } from 'src/enums/propertyType.enum';

@Injectable()
export class PropertyService {
  private properties: Property[] = [
    {
      id: uuid(),
      type: PropertyType.Apartment,
      location: new Location(),
      rooms: 3,
      bathrooms: 3,
      area: 20,
      cost_per_night: 1000, // costo por noche
      max_people: 8, // max gente que puede alojar
    },
    {
      id: uuid(),
      type: PropertyType.Apartment,
      location: new Location(),
      rooms: 5,
      bathrooms: 2,
      area: 35,
      cost_per_night: 1400, // costo por noche
      max_people: 10, // max gente que puede alojar
    },
  ]

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
