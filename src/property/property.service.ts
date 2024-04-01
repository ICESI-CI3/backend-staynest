import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { Property } from './entities/property.entity';
import { isUUID } from 'class-validator';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class PropertyService {
  private readonly logger = new Logger('ProductsService');

 /**  create(createPropertyDto: CreatePropertyDto): Property {
    const property: Property = {
      id: uuid(),
      // lo que hace el spread operator es juntar
      // aquí en este objeto 'car' los atributos
      // que trae el 'createCar' junto con el id
      location: new Location(createPropertyDto.country, createPropertyDto.city, createPropertyDto.address),
      type: this.typeOfProperty(createPropertyDto.type),
      ...createPropertyDto
    };

    this.properties.push(property);
    return property;
  }**/

  typeOfProperty(type: string): PropertyType {
    switch (type) {
      case "House":
        return PropertyType.House;
       
      case "Apartment":
        return PropertyType.Apartment;
        
      case "Chalet":
        return PropertyType.Chalet;
       
    }
  }

  // find all - recibimos pagination por parametro
  async findAll( paginationDto: PaginationDto ) {

    const { limit = 10, offset = 0 } = paginationDto;

    // find usando take and skip tomados de pagination
    return await this.propertyRepository.find({
      take: limit,
      skip: offset,
    })
  }

  // find one :  puede buscar por cualquiera de las dos propiedades
  // slug o ID
  async findOne( term: string ) {
    let property: Property;

    if ( isUUID(term) ) {
      property = await this.propertyRepository.findOneBy({ id: term });
    } else {
      // hacemos las Queries con query builder -> buscamos
      // correspondencia en la base de datos comparando slugs
      const queryBuilder = this.propertyRepository.createQueryBuilder(); 
      property = await queryBuilder
        .where('slug =:slug', {
          // parametros que le pasamos para la busqueda
          slug: term.toLowerCase(),
        }).getOne();
    }

    if ( !property ) 
      throw new NotFoundException(`Property with ${ term } not found`);

    return property;
  }

  // update
  async update(id: string, updatePropertyDto: UpdatePropertyDto) {
    // buscamos la property y la updateamos haciendo merge
    // con el spread operator
    const property = await this.propertyRepository.preload({
      id: id,
      ...updatePropertyDto
    });

    if ( !property ) throw new NotFoundException(`Property with id: ${ id } not found`);

    try {
      await this.propertyRepository.save( property );
      return property;
      
    } catch (error) {
      this.handleDBExceptions(error);
    }
   
  }

  // remove 
  async remove(id: string) {
    const property = await this.findOne( id );
    await this.propertyRepository.remove( property );
  }

  // manejamos la excepciones de la base de datos
  private handleDBExceptions( error: any ) {
    if ( error.code === '23505' )
      throw new BadRequestException(error.detail);
    
    this.logger.error(error)
    throw new InternalServerErrorException('Unexpected error, check server logs');

  }
}
