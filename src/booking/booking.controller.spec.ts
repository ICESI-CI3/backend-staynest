import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { AppModule } from '../../src/app.module';
import { v4 as uuid } from 'uuid';

describe('BookingController (e2e)', () => {
  let app: INestApplication;
  let bookingId: string;
  let tokenId: string; // Token to be used in authenticated requests
  let userId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/user/register (POST) should create a user and log in', async () => {
    const createUserDto = {
      email: 'test@example.com',
      password: 'testPassword',
      name: 'Test User',
      role: 'OWNER'
    };

    const userResponse = await request(app.getHttpServer())
      .post('/user/register')
      .send(createUserDto)
      .expect(HttpStatus.CREATED);

    userId = userResponse.body.id;

    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: createUserDto.email,
        password: createUserDto.password
      })
      .expect(HttpStatus.OK);

    tokenId = loginResponse.body.access_token;
  });

  it('/booking (POST) should create a booking', async () => {
    const bookingDto = {
      check_in: new Date(),
      check_out: new Date(),
      property_type: 'Apartment',
      property_id: uuid(),
      user_id: userId,
      num_people: 2,
      payment_method: 'Credit_card',
      is_paid: true,
      is_confirmed: false
    };

    const response = await request(app.getHttpServer())
      .post('/booking')
      .set('Authorization', `Bearer ${tokenId}`)
      .send(bookingDto)
      .expect(HttpStatus.CREATED);

    bookingId = response.body.id;
  });

  it('/booking/:id (GET) should return specific booking', async () => {
    await request(app.getHttpServer())
      .get(`/booking/${bookingId}`)
      .set('Authorization', `Bearer ${tokenId}`)
      .expect(HttpStatus.OK);
  });

  it('/booking/:id (PATCH) should update a booking', async () => {
    const updateDto = { num_people: 3 };

    await request(app.getHttpServer())
      .patch(`/booking/${bookingId}`)
      .set('Authorization', `Bearer ${tokenId}`)
      .send(updateDto)
      .expect(HttpStatus.OK);
  });

  it('/booking/:id (DELETE) should delete a booking', async () => {
    await request(app.getHttpServer())
      .delete(`/booking/${bookingId}`)
      .set('Authorization', `Bearer ${tokenId}`)
      .expect(HttpStatus.OK);
  });

  it('/user/:id (DELETE) should remove the user', async () => {
    await request(app.getHttpServer())
      .delete(`/user/${userId}`)
      .expect(HttpStatus.OK);
  });

  afterAll(async () => {
    await app.close();
  });
});
