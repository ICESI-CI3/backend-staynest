import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import {v4 as uuid} from 'uuid';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/enums/role.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  private users: User[] = [
    // {
    //   id: uuid(),
    //   email: 'juan@juan.com',
    //   password: '1234',
    //   name: 'Juan',
    //   role: Role.OWNER

    // },
    // {
    //   id: uuid(),
    //   email: 'pablo@pablo.com',
    //   password: '1234',
    //   name: 'Pablo',
    //   role: Role.ADMIN 
    // }
  ];

  async create(createUserDto: CreateUserDto) {
    try {

      const { password, ...userData } = createUserDto;
      
      const user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync( password, 10 ),
      });

      await this.userRepository.save( user )
      delete user.password;

      return {
        ...user,
        token: this.jwtService.sign({ id: user.id })
      };
      // TODO: Retornar el JWT de acceso

    } catch (error) {
      this.handleDBErrors(error);
    }

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
  private handleDBErrors( error: any ): never {


    if ( error.code === '23505' ) 
      throw new BadRequestException( error.detail );

    console.log(error)

    throw new InternalServerErrorException('Please check server logs');

  }
}
