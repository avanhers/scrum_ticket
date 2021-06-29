import { Controller, Post,  Logger } from '@nestjs/common';
import { TicketService } from './ticket.service';

@Controller('ticket')
export class TicketController {
  private logger= new Logger('AuthController');
  constructor(private TticketService:TicketService) {};
  
  @Post()
    public async postTicket(){
      console.log("HELLO FROM TICKET MICROSERVICES");
      return(null);
    }
}
