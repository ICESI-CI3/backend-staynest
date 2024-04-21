import { Global, Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthGuard } from './guards/auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { ConfigModule, ConfigService } from '@nestjs/config';
<<<<<<< HEAD
import { JwtStrategy } from './strategies/jwt.strategy';
=======
import { config } from 'dotenv';
>>>>>>> b7e0cea (Add async register for the jwt import module)

@Global()
@Module({
  imports: [
    forwardRef(() => UserModule),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '500s' },
      }),
      inject: [ConfigService],
    }),

  ],
  providers: [AuthService, AuthGuard, RolesGuard, JwtStrategy, JwtService],
  controllers: [AuthController],
  exports: [AuthService, AuthGuard, RolesGuard, JwtModule, JwtService],
})
export class AuthModule {}