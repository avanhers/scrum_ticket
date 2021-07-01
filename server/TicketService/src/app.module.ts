import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TicketModule } from './ticket/ticket.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://db_mongo/tickets'),TicketModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
