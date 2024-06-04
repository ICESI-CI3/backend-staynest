import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { UseGuards } from '@nestjs/common';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../enums/role.enum';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UserService } from '../user/user.service'; // Importa el servicio de User

@Controller('booking')
export class BookingController {
  constructor(
    private readonly bookingService: BookingService,
    private readonly userService: UserService, // Inyecta el servicio de User
  ) {}

  @Roles(Role.OWNER, Role.USER)
  @UseGuards(AuthGuard, RolesGuard)
  @Post()
  async create(@Body() createBookingDto: CreateBookingDto) {
    // Verifica si el ID de usuario es válido y existe
    const user = await this.userService.findOne(createBookingDto.user_id);
    if (!user) {
      throw new HttpException('Invalid or non-existent user ID', HttpStatus.BAD_REQUEST);
    }

    return this.bookingService.create(createBookingDto);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookingService.findOne(String(id));
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookingDto: UpdateBookingDto) {
    return this.bookingService.update(id, updateBookingDto);
  }

  @UseGuards(AuthGuard) 
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookingService.remove(String(id));
  }
}
