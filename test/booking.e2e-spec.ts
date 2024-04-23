import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';

describe('BookingController (e2e)', () => {
  let app: INestApplication;
  let bookingId: string;  

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/booking (POST) should create a booking', async () => {
    const bookingDto = {
      check_in: new Date(),
      check_out: new Date(),
      property_type: 'Apartment',
      property_id: '1',
      userId: '123',
      num_people: 2,
      payment_method: 'Credit_card',
      is_paid: true,
      is_confirmed: false,
    };

    const response = await request(app.getHttpServer())
      .post('/booking')
      .send(bookingDto)
      .expect(HttpStatus.CREATED);

    bookingId = response.body.id;  
    expect(response.body).toEqual({
      id: expect.any(String),
      property_id: bookingDto.property_id,
      userId: bookingDto.userId,
      num_people: bookingDto.num_people,
      payment_method: bookingDto.payment_method,
      is_paid: bookingDto.is_paid,
      is_confirmed: bookingDto.is_confirmed,
      check_in: expect.any(String),
      check_out: expect.any(String)
    });
  });

  it('/booking (GET) should return all bookings', async () => {
    await request(app.getHttpServer())
      .get('/booking')
      .expect(HttpStatus.OK)
      .then(response => {
        expect(response.body).toBeInstanceOf(Array);
      });
  });

  it('/booking/:id (PATCH) should update a booking', async () => {
    const updatedBookingDto = { num_people: 3 };
    await request(app.getHttpServer())
      .patch(`/booking/${bookingId}`)
      .send(updatedBookingDto)
      .expect(HttpStatus.OK)
      .then(response => {
        expect(response.body.num_people).toEqual(updatedBookingDto.num_people);
      });
  });

  it('/booking/:id (DELETE) should delete a booking', async () => {
    await request(app.getHttpServer())
      .delete(`/booking/${bookingId}`)
      .expect(HttpStatus.OK);
  });

  afterAll(async () => {
    await app.close();
  });
});
