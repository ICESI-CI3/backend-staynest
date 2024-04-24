import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BookingService } from './booking.service';
import { Booking } from './entities/booking.entity';
import { PropertyType } from '../enums/propertyType.enum';
import { Repository, createQueryBuilder } from 'typeorm';
import { PaymentMethod } from '../enums/paymentMethod.enum';

describe('BookingService', () => {
  let service: BookingService;
  let date2 = new Date();
  let bookings = [
    {
      id: '123',
      check_in: date2,
      check_out: date2,
      property_type: PropertyType.Apartment,
      property_id: '1196240a-cece-4230-83a3-bf724644f2fa',
      user_id: '1196240a-cece-4230-83a3-bf724644f2fa',
      num_people: 2,
      payment_method: PaymentMethod.Credit_card,
      is_paid: true,
      is_confirmed: false,
  },
  {
    id: '1234',
    check_in: date2,
    check_out: date2,
    property_type: PropertyType.Apartment,
    property_id: '1196240a-cece-4230-83a3-bf724644f2fa',
    user_id: '1196240a-cece-4230-83a3-bf724644f2fa',
    num_people: 3,
    payment_method: PaymentMethod.Credit_card,
    is_paid: true,
    is_confirmed: false,
  },
  {
    id: '12345',
    check_in: date2,
    check_out: date2,
    property_type: PropertyType.Apartment,
    property_id: '1196240a-cece-4230-83a3-bf724644f2fa',
    user_id: '1196240a-cece-4230-83a3-bf724644f2fa',
    num_people: 4,
    payment_method: PaymentMethod.Credit_card,
    is_paid: true,
    is_confirmed: false,
  }
  ];

  let bookingRepositoryMock: Partial<Record<keyof Repository<Booking>, jest.Mock>>;

  bookingRepositoryMock = {
    createQueryBuilder: jest.fn(() => ({
      where: jest.fn().mockReturnThis(),
      getMany: jest.fn().mockResolvedValue(bookings),
      getOne: jest.fn().mockResolvedValue(bookings[0]), // Asume que devolverá el primer elemento de properties para este ejemplo
      delete: jest.fn().mockReturnThis(),
      execute: jest.fn().mockResolvedValue(undefined),
    })),
    preload: jest.fn(({id, ...updateDto}) => ({
        id,
        ...updateDto
    })),
    create: jest.fn((dto) => ({ id: Math.floor(Math.random() * 100), ...dto })),
    save: jest.fn((dto) => dto),
    remove: jest.fn((propertyP) => {
      bookings = bookings.filter(property => property != propertyP);
      return Promise.resolve(bookings);
    }),
    findOne: jest.fn( (term) => {
        const byID = bookings.find(property => property.id === term);
      }),
    update: jest.fn((id, updateDto) => ({
        id,
        ...updateDto
    })),
    find: jest.fn(() => bookings),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookingService,
        {
          provide: getRepositoryToken(Booking),
          useValue: bookingRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<BookingService>(BookingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  let date3 = new Date();
  it('should create a Booking', async () => {
    const dto = {
      id: '123',
      check_in: date3,
      check_out: date3,
      property_type: PropertyType.Apartment,
      property_id: '1196240a-cece-4230-83a3-bf724644f2fa',
      userId:'3d2fc0d6-0334-46b5-966d-cb6bfd953e25',
      num_people: 2,
      payment_method: PaymentMethod.Credit_card,
      is_paid: true,
      is_confirmed: false,
    };

    expect(await service.create(dto)).toEqual({
      id: expect.any(String),
      check_in: date3,
      check_out: date3,
      property_type: PropertyType.Apartment,
      property_id: '1196240a-cece-4230-83a3-bf724644f2fa',
      userId: '3d2fc0d6-0334-46b5-966d-cb6bfd953e25',
      num_people: 2,
      payment_method: PaymentMethod.Credit_card,
      is_paid: true,
      is_confirmed: false,
    });
  });

  it('should save a booking', async () => {
    const dto = {
      id: '101',
      check_in: date3,
      check_out: date3,
      property_type: PropertyType.Apartment,
      property_id: '1196240a-cece-4230-83a3-bf724644f2fa',
      userId:'3d2fc0d6-0334-46b5-966d-cb6bfd953e25',
      num_people: 2,
      payment_method: PaymentMethod.Credit_card,
      is_paid: true,
      is_confirmed: false,
      };

    expect(await service.create(dto)).toEqual({
      id: expect.any(String),
      check_in: date3,
      check_out: date3,
      property_type: PropertyType.Apartment,
      property_id: '1196240a-cece-4230-83a3-bf724644f2fa',
      userId:'3d2fc0d6-0334-46b5-966d-cb6bfd953e25',
      num_people: 2,
      payment_method: PaymentMethod.Credit_card,
      is_paid: true,
      is_confirmed: false,
    });
  });

  it('should update a booking', async () => {
    const editedBooking = 
      {
        id: '123',
      check_in: date2,
      check_out: date2,
      property_type: PropertyType.Apartment,
      property_id: '1196240a-cece-4230-83a3-bf724644f2fa',
      userId: '1196240a-cece-4230-83a3-bf724644f2fa',
      num_people: 2,
      payment_method: PaymentMethod.Credit_card,
      is_paid: true,
      is_confirmed: false,
    }

    expect(await service.update('123', {
      check_in: date2,
      check_out: date2,
      property_type: PropertyType.Apartment,
      property_id: '1196240a-cece-4230-83a3-bf724644f2fa',
      userId: '1196240a-cece-4230-83a3-bf724644f2fa',
      num_people: 2,
      payment_method: PaymentMethod.Credit_card,
      is_paid: true,
      is_confirmed: false,

  })).toEqual(editedBooking);
  });

  it('should get a booking', async () => {
    expect(await service.findOne('123')).toEqual(
      {
        check_in: date2,
        check_out: date2,
        property_type: PropertyType.Apartment,
        property_id: '1196240a-cece-4230-83a3-bf724644f2fa',
        user_id: '1196240a-cece-4230-83a3-bf724644f2fa',
        num_people: 2,
        payment_method: PaymentMethod.Credit_card,
        is_paid: true,
        is_confirmed: false,
    }
    );
  });

  // get all bookings
  it('should get all bookings', async () => {  
    const bookingsExp = [
      {
        id: '123',
        check_in: date2,
        check_out: date2,
        property_type: PropertyType.Apartment,
        property_id: '1196240a-cece-4230-83a3-bf724644f2fa',
        user_id: '1196240a-cece-4230-83a3-bf724644f2fa',
        num_people: 2,
        payment_method: PaymentMethod.Credit_card,
        is_paid: true,
        is_confirmed: false,
    },
    {
      id: '1234',
      check_in: date2,
      check_out: date2,
      property_type: PropertyType.Apartment,
      property_id: '1196240a-cece-4230-83a3-bf724644f2fa',
      user_id: '1196240a-cece-4230-83a3-bf724644f2fa',
      num_people: 3,
      payment_method: PaymentMethod.Credit_card,
      is_paid: true,
      is_confirmed: false,
    },
    {
      id: '12345',
      check_in: date2,
      check_out: date2,
      property_type: PropertyType.Apartment,
      property_id: '1196240a-cece-4230-83a3-bf724644f2fa',
      user_id: '1196240a-cece-4230-83a3-bf724644f2fa',
      num_people: 4,
      payment_method: PaymentMethod.Credit_card,
      is_paid: true,
      is_confirmed: false,
    }
    ]
  });


  it('should delete a booking', async () => {
    const bookingsAfterRemove = [
    {
      id: '1234',
      check_in: date2,
      check_out: date2,
      property_type: PropertyType.Apartment,
      property_id: '1196240a-cece-4230-83a3-bf724644f2fa',
      user_id: '1196240a-cece-4230-83a3-bf724644f2fa',
      num_people: 3,
      payment_method: PaymentMethod.Credit_card,
      is_paid: true,
      is_confirmed: false,
    },
    {
      id: '12345',
      check_in: date2,
      check_out: date2,
      property_type: PropertyType.Apartment,
      property_id: '1196240a-cece-4230-83a3-bf724644f2fa',
      user_id: '1196240a-cece-4230-83a3-bf724644f2fa',
      num_people: 4,
      payment_method: PaymentMethod.Credit_card,
      is_paid: true,
      is_confirmed: false,
    }
    
    ]

    const booking = {
        id: '123',
        check_in: date2,
        check_out: date2,
        property_type: PropertyType.Apartment,
        property_id: '1196240a-cece-4230-83a3-bf724644f2fa',
        user_id: '1196240a-cece-4230-83a3-bf724644f2fa',
        num_people: 2,
        payment_method: PaymentMethod.Credit_card,
        is_paid: true,
        is_confirmed: false,
    };

    expect(await service.remove('123')).toEqual(bookingsAfterRemove);

    expect(bookingRepositoryMock.find).toHaveBeenCalledWith();
    expect(bookingRepositoryMock.find).toHaveBeenCalledTimes(1);
  });
});