import { Injectable, CanActivate, ExecutionContext,Inject,Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Reflector } from '@nestjs/core';
import {Role} from"./role.enum";
import{ROLES_KEY} from "./role.decorator";
import { timeout } from 'rxjs/operators';
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector,
  @Inject('AUTH_CLIENT') private readonly client: ClientProxy) {}

  
  async canActivate(context: ExecutionContext): Promise<boolean> {
    
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    const req = context.switchToHttp().getRequest();
    var resp;
    

    try{
      resp = await this.client.send(
        { role: 'auth', cmd: 'check' },
        { jwt: req.headers['authorization']?.split(' ')[1]})
        .pipe(timeout(5000))
        .toPromise<boolean>();
        
    } catch(err) {
      Logger.error(err);
      return false;
    }
    
    if (!requiredRoles) {
      return true;
    }
    if(resp.user){
      req.user=resp.user;
      return requiredRoles.some((role) => resp.user.roles?.includes(role));
    }
    return(false)
  }
}