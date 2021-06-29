import { Injectable,HttpException, Logger } from '@nestjs/common';
import { UserDto } from './user.dto';
import {Model} from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {IUser} from "./interfaces/user.interface";

@Injectable()
export class UserService {
    private logger= new Logger('UserService');
    constructor(@InjectModel('User') private readonly userModel:Model<IUser>){}
 
    public async getUsers(){
        const users = await this.userModel.find().exec();
        if(!users || !users[0]){
            throw new HttpException('Not Found',404)
        }
        return users;
    }

    public async postUser(newUser: UserDto){
        
        const user =  await new this.userModel(newUser);
        return user.save();
    }

     public async getUserByLogin(username: string): Promise<any>{
         const user= this.userModel.findOne({username});
         // unexpected : if login does not exist in DB , findOne doesn't return null , then we never enter the below block 
         if(!user){
            this.logger.log( "user" + user +" dont exist in DB");
             throw new HttpException("not Found",404);
         }
         
         this.logger.log( "user " + username +' found');
         return user;
     }

}