import { Injectable,  Logger } from '@nestjs/common';
import { TicketDto } from './ticket.dto';
import {Model} from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {ITicket} from "./interfaces/ticket.interface";


@Injectable()
export class TicketService {
  private logger= new Logger('TicketService');
  constructor(@InjectModel('Ticket') private readonly ticketModel:Model<ITicket>) {}

   public async create(newTicket:TicketDto){
    const ticket= await new this.ticketModel(newTicket);
    this.logger.log("Ticket add into  in db")
      return ticket.save();
   }
   
   public async delete(ticketID:String){
    console.log(ticketID)
    const res = await  this.ticketModel.deleteOne(ticketID);
    if (res.deletedCount==0)
    {
      this.logger.log("Ticket "+ ticketID["_id"]+" don't exist in db");
      return;
    }
    this.logger.log("Ticket "+ ticketID["_id"] +" deleted");
   }

   public async update(newTicket:TicketDto){
    const query={"_id" :newTicket["_id"]};
    const mongoRes = await this.ticketModel.replaceOne(query,newTicket);
    
    this.logger.log("Ticket "+ newTicket["_id"] +" update");
    return ;
  }

  public async search(searchInfo:Object){
    const searchregex =".*"+searchInfo["contain"] +".*"; 
    const res = await this.ticketModel.find({[searchInfo["field"]] : {$regex : searchregex}})
    this.logger.log("searching db for tickets with field " + searchInfo["field"] + " containing " + searchInfo["contain"] )
    return res;
  }

}