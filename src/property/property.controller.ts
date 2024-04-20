import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';
import { PropertyService } from './property.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { PaginationDto } from '../common/dto/pagination.dto';

// TO DO: Return Types !!!
@Controller('property')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  // create a new property
  @Post()
  create(@Body() createPropertyDto: CreatePropertyDto) {
    return this.propertyService.create(createPropertyDto);
  }

  // find all properties
  // pasamos como parametro el PaginationDto
  // que indica la cantidad max a mostrar y 
  // paginacion
  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.propertyService.findAll(paginationDto);
  }

  // find a property with a specific ID
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.propertyService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updatePropertyDto: UpdatePropertyDto) {
    return this.propertyService.update(id, updatePropertyDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.propertyService.remove(id);
  }
}
