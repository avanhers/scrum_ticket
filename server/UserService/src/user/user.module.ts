import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import {UserSchema} from './user.schema';
import {ClientsModule,Transport} from '@nestjs/microservices';

@Module({
  imports:[
    ClientsModule.register([{
      name: 'AUTH_CLIENT',
      transport: Transport.TCP,
      options: {
        host: 'localhost',
        port: 4000
      }
    }]),
    MongooseModule.forFeature([
      {
        name:'User',
        schema:UserSchema,
      }
    ]),
  ],
  providers: [UserService],
  controllers: [UserController],
  
})
export class UserModule {}