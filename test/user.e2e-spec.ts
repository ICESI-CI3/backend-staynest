import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { HttpServer, INestApplication } from '@nestjs/common';
import { UserModule } from '../src/user/user.module';
import { User } from '../src/user/entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AuthModule } from '../src/auth/auth.module';
import { Repository } from 'typeorm';

describe('UserController (e2e)', () => {
  let app: INestApplication;
  let httpServer: HttpServer;
  let userRepository: Repository<User>
  let createdUser: User;

  const mockUserRepository = {
    create: jest.fn((dto) => ({ id: Math.floor(Math.random() * 100), ...dto })),
    save: jest.fn((dto) => dto),
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, AuthModule],
    })
    .compile();

    app = moduleFixture.createNestApplication(); // Initialize the app here
    await app.init();
    httpServer = app.getHttpServer();
    userRepository = app.get(getRepositoryToken(User));
  });

  it('should create a new user', async () => {
    const createUserDto = {
      name: 'John Doe',
      email: 'john@example323.com',
      password: 'password123',
      role: 'OWNER'
    };
  
    const response = await request(app.getHttpServer())
      .post('/user/register')
      .send(createUserDto)
      .expect(201);
  
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('name', createUserDto.name);
    expect(response.body).toHaveProperty('email', createUserDto.email);
    createdUser = await userRepository.findOne({ where: { email: 'john@example323.com' } });
    
  });

  
    

  afterEach(async () => {
    if (createdUser) {
        await userRepository.delete(createdUser.id);
      }
    if (app) {
        await app.close();
      }
  });

});