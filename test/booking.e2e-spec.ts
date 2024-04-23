import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { HttpServer } from '@nestjs/common';
import { BookingModule } from '../src/booking/booking.module';
import { AppModule } from '../src/app.module';
import { UserModule } from '../src/user/user.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AuthModule } from '../src/auth/auth.module';
import { Repository } from 'typeorm';
import { Booking } from 'src/booking/entities/booking.entity';

describe('BookingController (e2e)', () => {
    let app: INestApplication;
    let httpServer: HttpServer;
    let userRepository: Repository<Booking>
    let createdUser: Booking;
    beforeEach(async () => {
      const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [AppModule, AuthModule,BookingModule], 
      }).compile();
  
      app = moduleFixture.createNestApplication();
      await app.init();
      
    });

    it('should create a booking', async () => {
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
      
        await request(app.getHttpServer())
          .post('/booking')
          .send(bookingDto)
          .expect(HttpStatus.CREATED)
          .then(response => {
            expect(response.body).toHaveProperty('id');
            expect(response.body.property_id).toEqual(bookingDto.property_id);
          });
      });
      afterEach(async () => {
        await app.close();
      });
    });
    