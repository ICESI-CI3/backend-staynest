import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query, UseGuards } from '@nestjs/common';
import { PropertyService } from './property.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/enums/role.enum';
import { Property } from './entities/property.entity';


// TO DO: Return Types !!!
@Controller('property')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  /**@Post()
  // create a new property
  @Roles(Role.OWNER)
  @UseGuards(AuthGuard, RolesGuard)
  @Post()
  create(@Body() createPropertyDto: CreatePropertyDto) {
    return this.propertyService.create(createPropertyDto);
  }

  // find all properties
  // pasamos como parametro el PaginationDto
  // que indica la cantidad max a mostrar y 
  // paginacion
  @UseGuards(AuthGuard)
  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.propertyService.findAll(paginationDto);
  }

  // find a property with a specific ID
  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.propertyService.findOne(id);
  }

  @Roles(Role.OWNER)
  @UseGuards(AuthGuard, RolesGuard)
  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updatePropertyDto: UpdatePropertyDto) {
    return this.propertyService.update(id, updatePropertyDto);
  }

  @Roles(Role.OWNER)
  @UseGuards(AuthGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.propertyService.remove(id);
  }**/
}
