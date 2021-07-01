import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { TicketService } from "./ticket.service";
import { TicketController } from "./ticket.controller";
import { MongooseModule } from '@nestjs/mongoose';
import {TicketSchema} from './ticket.schema';

@Module({
  imports: [
    ClientsModule.register([{
        name: 'USER_CLIENT',
        transport: Transport.TCP,
        options: {
        host: 'localhost',
        port: 4000,
    }
  }]),
  MongooseModule.forFeature([
    {
      name:'Ticket',
      schema:TicketSchema,
    }
  ])
],
  providers: [TicketService],
  controllers: [TicketController]
  
})
export class TicketModule {}