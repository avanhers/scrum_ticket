import { Injectable,HttpException, Logger, Inject,RequestTimeoutException } from '@nestjs/common';
import { UserDto } from './user.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IUser } from "./interfaces/user.interface";
import { timeout, catchError } from 'rxjs/operators';
import { TimeoutError, throwError } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class UserService {
    private logger= new Logger('UserService');
    constructor(@InjectModel('User') private readonly userModel:Model<IUser>,
        @Inject('TICKET_CLIENT')  private readonly ticketClient: ClientProxy
    ){}
 

    public async postUser(newUser: UserDto){
        
        const user =  await new this.userModel(newUser);
        return user.save();
    }
    //TODO : method must return null if user does not exist.
     public async getUserByLogin(username: string): Promise<any>{
         const user= this.userModel.findOne({username});
         // unexpected : if login does not exist in DB , findOne doesn't return null , then we never enter the below block 
         if(!user){
            this.logger.log( "user" + user + " dont exist in DB");
             throw new HttpException("not Found",404);
         }
         
         this.logger.log( "user " + username +' found');
         console.log(user)
         return user;
     }

     public async createTicket(createby:String,ticketInfo:Object){
        try{
            this.logger.log("Message send <Ticket:Create>")
            ticketInfo={...ticketInfo,createdBy:createby}
           const user = await this.ticketClient.send({ role: 'ticket', cmd: 'post' },  {ticketInfo})
           .pipe(
            timeout(5000), 
            catchError(err => {
            if (err instanceof TimeoutError) {
              return throwError(new RequestTimeoutException());
            }
            return throwError(err);
          }),)
          .toPromise();
        }
        catch(e){
            this.logger.log(e);
            return(null);
        }
     }
     
     public async deleteTicket(ticketID:String){
        try{
            this.logger.log("Message send <Ticket:Create>")
            const user = await this.ticketClient.send({ role: 'ticket', cmd: 'delete' },  ticketID)
           .pipe(
            timeout(5000), 
            catchError(err => {
            if (err instanceof TimeoutError) {
              return throwError(new RequestTimeoutException());
            }
            return throwError(err);
          }),)
          .toPromise();
        }
        catch(e){
            this.logger.log(e);
            return(null);
        }
     }

     public async updateTicket(ticket:Object){
        try{
            this.logger.log("Message send <Ticket:Update>")
            const user = await this.ticketClient.send({ role: 'ticket', cmd: 'update' },  {ticket})
           .pipe(
            timeout(5000), 
            catchError(err => {
            if (err instanceof TimeoutError) {
              return throwError(new RequestTimeoutException());
            }
            return throwError(err);
          }),)
          .toPromise();
        }
        catch(e){
            this.logger.log(e);
            return(null);
        }
     }

     public async searchTicket(searchInfo:Object){
        try{
            this.logger.log("Message send <Ticket:Search>")
            const tickets = await this.ticketClient.send({ role: 'ticket', cmd: 'search' },  searchInfo)
           .pipe(
            timeout(5000), 
            catchError(err => {
            if (err instanceof TimeoutError) {
              return throwError(new RequestTimeoutException());
            }
            return throwError(err);
          }),)
          .toPromise();
          return(tickets)
        }
        catch(e){
            this.logger.log(e);
            return(null);
        }
       
     }

}