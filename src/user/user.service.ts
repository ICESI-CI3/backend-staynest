import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import {v4 as uuid} from 'uuid'

@Injectable()
export class UserService {

  private users: User[] = [
    {
      id: uuid(),
      email: 'juan@juan.com',
      password: '1234',
      name: 'Juan',
      role: 'OWNER'

    },
    {
      id: uuid(),
      email: 'pablo@pablo.com',
      password: '1234',
      name: 'Pablo',
      role: 'ADMIN'
    }
  ];

  create(createUserDto: CreateUserDto) {
    const {name} = createUserDto;
    const brand: User = {
      name,
      id: uuid(),
      email: createUserDto.email,
      password: createUserDto.password,
      role: createUserDto.role
     
    }
    this.users.push(brand)

    return brand;
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
