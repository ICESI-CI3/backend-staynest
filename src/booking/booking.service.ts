import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from './entities/booking.entity';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { isUUID } from 'class-validator';

@Injectable()
export class BookingService {
  private readonly logger = new Logger('BookingService');

  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>
  ) {}


  async create(createBookingDto: CreateBookingDto): Promise<Booking> {
    try {
      const booking = this.bookingRepository.create(createBookingDto);
      await this.bookingRepository.save(booking);
      return booking;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }


  async findAll(): Promise<Booking[]> {
    return await this.bookingRepository.find();
  }

  async findOne(id: string): Promise<Booking> {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid identifier');
    }
    const booking = await this.bookingRepository.findOneBy({ id });
    if (!booking) {
      throw new NotFoundException(`Booking with ID "${id}" not found`);
    }
    return booking;
  }


  async update(id: string, updateBookingDto: UpdateBookingDto): Promise<Booking> {
    const booking = await this.bookingRepository.preload({
      id: id,
      ...updateBookingDto
    });
    if (!booking) {
      throw new NotFoundException(`Booking with ID "${id}" not found`);
    }
    try {
      await this.bookingRepository.save(booking);
      return booking;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async remove(id: string): Promise<void> {
    const booking = await this.findOne(id); 
    await this.bookingRepository.remove(booking);
  }

  async populateWithSeedData(bookings: Booking[]) {
    try {
      await this.bookingRepository.save(bookings);
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }
    this.logger.error(`Database error: ${error.message}`, error.trace);
    throw new InternalServerErrorException('Unexpected error, check server logs');
  }
}