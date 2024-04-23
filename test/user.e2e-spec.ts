import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { HttpStatus, INestApplication } from '@nestjs/common';

describe('UserController (e2e)', () => {
  let app: INestApplication;
  let userId: string;  // Assuming you will use this to store the ID from the created user.

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/user (GET) should return all users', async () => {
    await request(app.getHttpServer())
      .get('/user')
      .expect(HttpStatus.OK)
      .then(response => {
        expect(response.body).toBeInstanceOf(Array);
      });
  });


  afterAll(async () => {
    await app.close();
  });
});
