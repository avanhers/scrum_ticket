import { Body, Controller,Get, Delete, Param, Post ,Put, Logger, UseGuards,Request} from '@nestjs/common';

import {UserService} from './user.service';
import { MessagePattern } from '@nestjs/microservices';
import {UserDto} from './user.dto';
import {hash} from 'bcrypt';
import {AuthGuard} from './guards/auth.guards'
import {Role} from "./roles/role.enum"
import {Roles} from './roles/role.decorator'
@Controller('user')
export class UserController {
    private logger= new Logger('UserController');
    constructor(private userService: UserService){}
    
    @MessagePattern({ role: 'user', cmd: 'get' })
    getUser(data: any): Promise<UserDto> {
    this.logger.log("Receive Message from AuthService <USER : GET> , Trying to find User in MongoDB")
    return this.userService.getUserByLogin(data.username);
  }

    @Post()
    public async postUser(@Body() user:UserDto){
        user.password= await hash(user.password,10);
        this.logger.log('user ' + user.username +' add to mongoDB');
        return this.userService.postUser(user);
    }

    @UseGuards(AuthGuard)
    @Get('greet') 
    async greet(): Promise<string> {
    return 'Greetings authenticated user';
    }

    @Get('username/:username')
    public  getUserByLogin(@Param('username') username: string){
        //console.log(this.userService.getUserByLogin(username))
        return this.userService.getUserByLogin(username);
    }

    @Post('ticket/create')
    @Roles(Role.SM)
    public  createTicket(@Request() req){
        return this.userService.createTicket(req.user._id,req.body);
    }

    @Delete('ticket')
    @Roles(Role.SM)
    public deleteTicket(@Request() req)
    {
        return this.userService.deleteTicket(req.body);
    }

    @Put('ticket/update')
    @Roles(Role.SM)
    public updateTicket(@Request() req)
    {
        return this.userService.updateTicket(req.body);
    }

    @Get('ticket/search')
    public searchTicket(@Request() req)
    {
        return this.userService.searchTicket(req.body);
    }
    

    

}