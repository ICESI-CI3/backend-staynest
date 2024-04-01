import { Injectable } from '@nestjs/common';
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

        // si no encuentra el car
        if (!booking) {
            throw new NotFoundException(`No bookings`);
        }

        return booking;
  }

  update(id: number, updateBookingDto: UpdateBookingDto) {
    return `This action updates a #${id} booking`;
  }

  remove(id: string) {
    return `This action removes a #${id} booking`;
  }
}
