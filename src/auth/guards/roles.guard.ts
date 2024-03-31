import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { access } from 'fs';
import { Role } from 'src/enums/role.enum'; // Ensure this is the correct path to your Role enum

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<Role[]>('roles', context.getHandler());
    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    
    const token = request.user; // `user` here should now be the JWT payload
    console.log('Token:', token);
    console.log(request.user)
    //console.log(request)
    if (!token) {
      console.error('Token object is undefined.');
      return false; // Handle according to your application's needs
    }


    return requiredRoles.some((role) => role === token.role);
    
  }
}
