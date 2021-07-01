import {Document} from 'mongoose';

export interface ITicket extends Document{
    name:String;
    description: String;
    createdBy:String;
    status:String;
}