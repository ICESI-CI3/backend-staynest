import { Global, Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthGuard } from './guards/auth.guard';
import { Role } from 'src/enums/role.enum';
import { RolesGuard } from './guards/roles.guard';

@Global()
@Module({
  imports: [
    forwardRef(() => UserModule),
    JwtModule.register({
      global: true,
      secret: "secret",
      signOptions: { expiresIn: '500s' },
    }),

  ],
  providers: [AuthService, AuthGuard, RolesGuard],
  controllers: [AuthController],
  exports: [AuthService, AuthGuard, RolesGuard],
})
export class AuthModule {}