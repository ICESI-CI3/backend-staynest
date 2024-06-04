import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { BookingService } from '../booking/booking.service';
import { PropertyService } from '../property/property.service';
import { Booking } from '../booking/entities/booking.entity'; // Importa la entidad Booking
import { Property } from '../property/entities/property.entity'; // Importa la entidad Property

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly bookingService: BookingService,
    private readonly propertyService: PropertyService,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }

  // Añadir reserva al usuario
  @Post(':id/add-booking')
  async addBooking(@Param('id') userId: string, @Body() addBookingDto: { bookingId: string }) {
    const user = await this.userService.findOne(userId);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const booking = await this.bookingService.findOne(addBookingDto.bookingId);
    if (!booking) {
      throw new HttpException('Booking not found', HttpStatus.NOT_FOUND);
    }

    user.bookings.push(booking);
    await this.userService.update(userId, user);

    return user;
  }

  // Añadir propiedad al usuario
  @Post(':id/add-property')
  async addProperty(@Param('id') userId: string, @Body() addPropertyDto: { propertyId: string }) {
    const user = await this.userService.findOne(userId);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const property = await this.propertyService.findOne(addPropertyDto.propertyId);
    if (!property) {
      throw new HttpException('Property not found', HttpStatus.NOT_FOUND);
    }

    user.properties.push(property);
    await this.userService.update(userId, user);

    return user;
  }
}
