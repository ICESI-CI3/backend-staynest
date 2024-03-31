import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import {v4 as uuid} from 'uuid';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/enums/role.enum';
@Injectable()
export class UserService {

  private users: User[] = [
    {
      id: uuid(),
      email: 'juan@juan.com',
      password: '1234',
      name: 'Juan',
      role: Role.OWNER

    },
    {
      id: uuid(),
      email: 'pablo@pablo.com',
      password: '1234',
      name: 'Pablo',
      role: Role.ADMIN 
    }
  ];

  async create(createUserDto: CreateUserDto) {
    const {name} = createUserDto;
    
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10)
    const user: User = {
      name,
      id: uuid(),
      email: createUserDto.email,
      password: hashedPassword,
      role: createUserDto.role as Role
     
    }
    this.users.push(user)

    return user;
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: string) {
    const user: User = this.users.find(user => user.id === id);

        // si no encuentra el car
        if (!user) {
            throw new NotFoundException(`Car with ID ${id} not found`);
        }

        return user;
  }

  async findByEmail(email: string) {
    const user: User = this.users.find(user => user.email === email);

    if (!user) {
        throw new NotFoundException(`User with email ${email} not found`);
    }

    return user;
  }
  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
