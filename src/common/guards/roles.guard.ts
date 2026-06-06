import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        // Retrieve custom metadata metadata using the Reflector
        const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
        if (!requiredRoles) return true; // If no roles required, allow access

        const request = context.switchToHttp().getRequest();
        request.user = {
            id: 'user_12345',
            roles: ['guest'], // 👈 This is where your mock roles live!
        };
        const user = request.user; // Assuming auth middleware/guard populated this

        const hasRole = requiredRoles.some((role) => user?.roles?.includes(role));
        if (!hasRole) {
            throw new ForbiddenException('You do not have permission to access this resource.');
        }

        return true;
    }
}