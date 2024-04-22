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
    
    return ` Database seeded
                .  .
          |\_|\
          | a_a\
          | | "]
      ____| '-\___
     /.----.___.-'\
    //        _    \
   //   .-. (~v~) /|
  |'|  /\:  .--  / \
 // |-/  \_/____/\/~|
|/  \ |  []_|_|_] \ |
| \  | \ |___   _\ ]_}
| |  '-' /   '.'  |
| |     /    /|:  | 
| |     |   / |:  /\
| |     /  /  |  /  \
| |    |  /  /  |    \
\ |    |/\/  |/|/\    \
 \|\ |\|  |  | / /\/\__\
  \ \| | /   | |__
       / |   |____)
       |_/
              `;
  }

}
