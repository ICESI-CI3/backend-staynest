import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { userSeed } from './data/user.seed';

@Injectable()
export class SeedService {
  constructor(
    
    private readonly userService: UserService,
  ) {}

  populateDB() {
    this.userService.populateWithSeedData(userSeed);
    
    return 'Database seeded';
  }

}
