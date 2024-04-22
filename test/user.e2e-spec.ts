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

  // it('/user/register (POST) should create a user', async () => {
  //   const response = await request(app.getHttpServer())
  //     .post('/user/register')
  //     .send({
  //       email: 'test@example.com',
  //       password: 'password',
  //       name: 'Test User',
  //       role: 'USER'
  //     })
  //     .expect(HttpStatus.CREATED);

  //   userId = response.body.id;  // Store user ID for use in subsequent tests.
  //   expect(response.body).toEqual({
  //     id: expect.any(String),
  //     email: 'test@example.com',
  //     name: 'Test User',
  //     role: 'USER'
  //     // Omit password from the response check for security reasons
  //   });
  // });

  it('/user (GET) should return all users', async () => {
    await request(app.getHttpServer())
      .get('/user')
      .expect(HttpStatus.OK)
      .then(response => {
        expect(response.body).toBeInstanceOf(Array);
      });
  });

  // it('/user/:id (PATCH) should update a user', async () => {
  //   await request(app.getHttpServer())
  //     .patch(`/user/${userId}`)
  //     .send({ name: 'Updated Name' })
  //     .expect(HttpStatus.OK)
  //     .then(response => {
  //       expect(response.body.name).toEqual('Updated Name');
  //     });
  // });

  // it('/user/:id (DELETE) should delete a user', async () => {
  //   await request(app.getHttpServer())
  //     .delete(`/user/${userId}`)
  //     .expect(HttpStatus.OK);
  // });

  afterAll(async () => {
    await app.close();
  });
});
