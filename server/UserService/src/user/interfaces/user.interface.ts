import {Document} from 'mongoose';

export interface IUser extends Document{
    readonly id:number;
    readonly username:string;
    password:string;
    readonly role:[string];
}