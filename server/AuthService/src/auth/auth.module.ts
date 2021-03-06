import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from "./auth.service";
import { LocalStrategy } from "./local.strategy";
import { JwtStrategy } from "./jwt.strategy";
import { AuthController } from "./auth.controller";
import constants from "./constants";

@Module({
  imports: [ClientsModule.register([{
    name: 'USER_CLIENT',
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: 4000,
    }
  }]), JwtModule.register({
    secret: constants.jwtSecret,
    signOptions: { expiresIn: '600s' }
  })],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy,JwtStrategy]
})
export class AuthModule {}