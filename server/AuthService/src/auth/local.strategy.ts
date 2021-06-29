import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Logger,Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  private logger= new Logger('LocalStrategy');
  constructor(private readonly authService: AuthService) {
    super();
  }
   
  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password);
    if(!user) {
      throw new UnauthorizedException();
    }
    this.logger.log("Password Matching")
    return user;
  }
}