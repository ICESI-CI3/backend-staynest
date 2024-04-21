import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../../enums/role.enum'; // Ensure this is the correct path to your Role enum

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<Role[]>('roles', context.getHandler());
    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    
    const token = request.user; 
    console.log('Token:', token);
    console.log(request.user)
    
    if (!token) {
      console.error('Token object is undefined.');
      return false; 
    }

    return requiredRoles.some((role) => role === token.role);
    
  }
}
