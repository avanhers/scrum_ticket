import { Injectable, Inject, Logger, RequestTimeoutException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { timeout, catchError } from 'rxjs/operators';
import { TimeoutError, throwError } from 'rxjs';


@Injectable()
export class TicketService {
  private logger= new Logger('TicketService');
  constructor() {}

  
}