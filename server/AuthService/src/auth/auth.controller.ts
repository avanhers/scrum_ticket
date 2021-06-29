import { Controller,Body, Post, UseGuards, Request, Logger } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AuthController {
  private logger= new Logger('AuthController');
  constructor(
    private readonly authService: AuthService) {}
  @UseGuards(LocalAuthGuard)
  @Post('auth')
  async login(@Request() req) {
    this.logger.log("Post Request Accepted: User will be authenticate by receiving credentials")
    return this.authService.login(req.user);
  }

  @MessagePattern({ role: 'auth', cmd: 'check'})
  async loggedIn(data) {
    try {
      const res = this.authService.validateToken(data.jwt);

      return res;
    } catch(e) {
      this.logger.log(e);
      return false;
    }
  }
}
