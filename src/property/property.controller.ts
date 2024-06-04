import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { PropertyService } from './property.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { UseGuards } from '@nestjs/common';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../enums/role.enum';
import { RolesGuard } from '../auth/guards/roles.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Express } from 'express';
import { FirebaseService } from './firebase.service';

@Controller('property')
export class PropertyController {
  constructor(
    private readonly propertyService: PropertyService,
    private readonly firebaseService: FirebaseService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body() createPropertyDto: CreatePropertyDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const url = await this.firebaseService.uploadFile(file);
    createPropertyDto.imageUrl = url;  // Assuming you have imageUrl field in your DTO
    return this.propertyService.create(createPropertyDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.propertyService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    console.log('slug: ' + id);
    return this.propertyService.findOne(id);
  }

  @Roles(Role.OWNER)
  @UseGuards(AuthGuard, RolesGuard)
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePropertyDto: UpdatePropertyDto,
  ) {
    return this.propertyService.update(id, updatePropertyDto);
  }

  @Roles(Role.OWNER)
  @UseGuards(AuthGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.propertyService.remove(id);
  }
}
