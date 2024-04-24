import { Test, TestingModule } from '@nestjs/testing';
import { BookingService } from './booking.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { Repository } from 'typeorm';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { PropertyType } from '../enums/propertyType.enum';
import { PaymentMethod } from '../enums/paymentMethod.enum';
import  {v4 as uuid} from 'uuid';

describe('BookingService', () => {
  let service: BookingService;
  let repo: MockType<Repository<Booking>>;
  const exampleBooking: Booking = {
    id: '1',
    check_in: new Date(),
    check_out: new Date(),
    property_type: PropertyType.Apartment,
    property_id: uuid(),
    user_id: uuid(),
    num_people: 2,
    payment_method: PaymentMethod.Credit_card,
    is_paid: true,
    is_confirmed: false,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookingService,
        {
          provide: getRepositoryToken(Booking),
          useValue: {
            create: jest.fn().mockReturnValue(exampleBooking),
            save: jest.fn().mockResolvedValue(exampleBooking),
            findOneBy: jest.fn().mockResolvedValue(exampleBooking),
            remove: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    service = module.get<BookingService>(BookingService);
    repo = module.get(getRepositoryToken(Booking));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a booking', async () => {
    const createBookingDto: CreateBookingDto = {
      check_in: new Date(),
      check_out: new Date(),
      property_type: PropertyType.Apartment,
      property_id: uuid(),
      userId: uuid(),
      num_people: 3,
      payment_method: PaymentMethod.Credit_card,
      is_paid: false,
      is_confirmed: true,
    };
    expect(await service.create(createBookingDto)).toEqual({
      ...createBookingDto,
      id: exampleBooking.id,
    });
    expect(repo.create).toHaveBeenCalledWith(createBookingDto);
    expect(repo.save).toHaveBeenCalledWith(createBookingDto);
  });

  it('should find one booking', async () => {
    expect(await service.findOne('1')).toEqual(exampleBooking);
    expect(repo.findOneBy).toHaveBeenCalledWith({ id: '1' });
  });

  it('should update a booking', async () => {
    const updateBookingDto: UpdateBookingDto = {
      num_people: 4,
    };
    expect(await service.update('1', updateBookingDto)).toEqual({
      ...exampleBooking,
      ...updateBookingDto,
    });
    expect(repo.findOneBy).toHaveBeenCalledWith({ id: '1' });
    expect(repo.save).toHaveBeenCalledWith({ ...exampleBooking, ...updateBookingDto });
  });

  it('should remove a booking', async () => {
    await service.remove('1');
    expect(repo.remove).toHaveBeenCalled();
  });
});

type MockType<T> = {
  [P in keyof T]?: jest.Mock;
};
