import { BadRequestException, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import {v4 as uuid} from 'uuid';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {

      const { password, ...userData } = createUserDto;
      
      const user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10),
      });

      await this.userRepository.save( user )
      

      return user;
      

    } catch (error) {
      this.handleDBErrors(error);
    }

  }

  async findAll() {
    const cachedUsers: User[] = await this.cacheManager.get('users');
    if (cachedUsers){
      return cachedUsers
    }
    const users = await this.userRepository.find();
    await this.cacheManager.set('users', users)
    return users;
  }

  async findOne(id: string) {
    const cachedUser: User = await this.cacheManager.get(`user_${id}`);
    if (cachedUser){
      return cachedUser
    }

    const user: User = await this.userRepository.findOne({
      where: { id }
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    await this.cacheManager.set(`user_${id}`, user)
    return user;
  }
  /* istanbul ignore next */
  async findByEmail(email: string) {
    const cachedUser: User = await this.cacheManager.get(`user_${email}`);
    if (cachedUser){
      return cachedUser
    }
    const user: User = await this.userRepository.findOne({
      where: { email }
    });

    if (!user) {
        throw new NotFoundException(`User with email ${email} not found`);
    }
   await this.cacheManager.set(`user_${email}`, user)
    return user;
  }
  /* istanbul ignore next */
  async update(id: string, updateUserDto: UpdateUserDto) {

    const user = await this.userRepository.preload({
      id: id,
      ...updateUserDto
    });

    if ( !user ) throw new NotFoundException(`User with id: ${ id } not found`);

    try {
      await this.userRepository.save( user );
      return user;
      
    } catch (error) {
      this.handleDBErrors(error);
    }
   
  }
  /* istanbul ignore next */
  async remove(id: string) {
    const user = await this.findOne( id );
    await this.userRepository.delete(id);
  }

  async populateWithSeedData(users: User[]) {
    try {
      const crypPasswordUers = users.map(user => {
        return {
          ...user,
          password: bcrypt.hashSync(user.password, 10)
        }
      })
      await this.userRepository.save(crypPasswordUers);
    } catch (error) {
      this.handleDBErrors(error);
    }
  }
  /* istanbul ignore next */
  private handleDBErrors( error: any ): never {


    if ( error.code === '23505' ) 
      throw new BadRequestException( error.detail );

    console.log(error)

    throw new InternalServerErrorException('Please check server logs');

  }
}