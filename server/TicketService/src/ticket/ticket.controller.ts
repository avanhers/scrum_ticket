import { Controller, Post, Get,  Logger, Body } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import {TicketDto} from './ticket.dto';
import {TicketService} from './ticket.service'

@Controller('ticket')
export class TicketController {
  private logger= new Logger('TicketController');
  constructor(private ticketService:TicketService) {};
  
  @Post()
    public async postTicket(@Body() ticket:TicketDto){
      this.ticketService.create(ticket)
      return(null);
    }
  
  @Get()
    public async getTicket(){
      return(null);
    }
  
  @MessagePattern({ role: 'ticket', cmd: 'post' })
  create(data){
    this.logger.log("Message receive ,<Ticket:Create>")
    this.ticketService.create(data["ticketInfo"]);
  }

  @MessagePattern({ role: 'ticket', cmd: 'delete' })
  delete(data){
    this.logger.log("Message receive ,<Ticket:Delete>")
    this.ticketService.delete(data);
  }

  @MessagePattern({ role: 'ticket', cmd: 'update' })
  update(data){
    this.logger.log("Message receive ,<Ticket:Update>")
    this.ticketService.update(data["ticket"]);
  }

  @MessagePattern({ role: 'ticket', cmd: 'search'})
  search(data){
    this.logger.log("Message receive ,<Ticket:Search>")
    return this.ticketService.search(data);
  }



}
