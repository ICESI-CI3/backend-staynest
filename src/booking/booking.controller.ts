import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/enums/role.enum';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { AuthGuard } from '../auth/guards/auth.guard';
import { UseGuards } from '@nestjs/common';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Roles(Role.USER)
  //@UseGuards(AuthGuard, RolesGuard)
  @Post()
  create(@Body() createBookingDto: CreateBookingDto) {
    return this.bookingService.create(createBookingDto);
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookingService.findOne(String(id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookingDto: UpdateBookingDto) {
    return this.bookingService.update(id, updateBookingDto);
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookingService.remove(String(id));
  }
}