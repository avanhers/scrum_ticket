import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { TicketService } from "./ticket.service";
import { TicketController } from "./ticket.controller";

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
    ClientsModule.register([{
        name: 'AUTH_CLIENT',
        transport: Transport.TCP,
        options: {
        host: 'localhost',
        port: 4010,
    }
  }]),
],
  controllers: [TicketController],
  providers: [TicketService]
})
export class TicketModule {}