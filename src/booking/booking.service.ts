import { Injectable, NotFoundException } from '@nestjs/common';
import {v4 as uuid} from 'uuid';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { Booking } from './entities/booking.entity';
import { PropertyType } from 'src/enums/propertyType.enum';
import { PaymentMethod } from 'src/enums/paymentMethod.enum';



@Injectable()
export class BookingService {
  private bookings: Booking[] = [
    {
      id: uuid(),
      check_in: new Date(),
      check_out: new Date(),
      property_type: PropertyType.Apartment,
      property_id: "1",
      user_id: "2",
      num_people: 3,
      payment_method: PaymentMethod.Credit_card,
      is_paid: true, 
      is_confirmed: true, 
    }
  ];

  async create(createBookingDto: CreateBookingDto): Promise<Booking> {
    const booking : Booking ={
      id: uuid(),
      check_in: createBookingDto.check_in,
      check_out: createBookingDto.check_out,
      property_type: createBookingDto.property_type,
      property_id: createBookingDto.property_id,
      user_id: createBookingDto.userId,
      num_people: createBookingDto.num_people,
      payment_method: createBookingDto.payment_method,
      is_paid: createBookingDto.is_paid,
      is_confirmed: createBookingDto.is_confirmed,
    };
    this.bookings.push(booking);
    return booking;
  }

  findAll() {
    return this.bookings;
  }

  findOne(id: string) {
    const booking: Booking = this.bookings.find(book => book.id === id);
        if (!booking) {
            throw new NotFoundException(`No bookings`);
        }

        return booking;
  }

  update(id: string, updateBookingDto: UpdateBookingDto): Booking {
    const bookingIndex = this.bookings.findIndex((book) => book.id === id);
    if (bookingIndex === -1) {
      throw new NotFoundException(`Booking with ID "${id}" not found.`);
    }
  
    const updatedBooking = { ...this.bookings[bookingIndex], ...updateBookingDto };
    this.bookings[bookingIndex] = updatedBooking;
    return updatedBooking;
  }
  

  remove(id: string): { message: string } {
    const bookingIndex = this.bookings.findIndex((book) => book.id === id);
    if (bookingIndex === -1) {
      throw new NotFoundException(`Booking with ID "${id}" not found.`);
    }
  
    this.bookings.splice(bookingIndex, 1);
  
    return { message: `Booking with ID "${id}" has been removed.` };
  }
  
  
}

