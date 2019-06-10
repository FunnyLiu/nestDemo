import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

import { Reflector } from '@nestjs/core';
import { SECRET } from '../constants/secret';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        if (!roles) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const authorization = request.header('Authorization')
        const token = (authorization as string).split(' ')[1];
        const decoded: any = jwt.verify(token, SECRET);
        const hasRole = () => decoded.roles.some((role) => 
            roles.includes(role.name)
        );
        return decoded && decoded.roles && hasRole();
    }
}