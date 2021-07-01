import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import {UserSchema} from './user.schema';
import {ClientsModule,Transport} from '@nestjs/microservices';
import {RolesGuard} from "./roles/roles.guards"
import{APP_GUARD} from "@nestjs/core"
@Module({
  imports:[
    ClientsModule.register([{
      name: 'AUTH_CLIENT',
      transport: Transport.TCP,
      options: {
        host: 'localhost',
        port: 4010
      }
    }]),
    ClientsModule.register([{
      name: 'TICKET_CLIENT',
      transport: Transport.TCP,
      options: {
        host: 'localhost',
        port: 4020
      }
    }]),
    MongooseModule.forFeature([
      {
        name:'User',
        schema:UserSchema,
      }
    ]),
  ],
  providers: [UserService,{
    provide: APP_GUARD,
    useClass: RolesGuard,
  },],
  controllers: [UserController],
  
})
export class UserModule {}