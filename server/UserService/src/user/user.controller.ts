import { Body, Controller,Get, Param, Post , Logger, UseGuards} from '@nestjs/common';
import {UserService} from './user.service';
import { MessagePattern } from '@nestjs/microservices';
import {UserDto} from './user.dto';
import {hash} from 'bcrypt';
import {AuthGuard} from './guards/auth.guards'
@Controller('user')
export class UserController {
    private logger= new Logger('UserController');
    constructor(private userService: UserService){}
    
    @MessagePattern({ role: 'user', cmd: 'get' })
    getUser(data: any): Promise<UserDto> {
    this.logger.log("Receive Message from AuthService <USER : GET> , Trying to find User in MongoDB")
    return this.userService.getUserByLogin(data.username);
  }
    @Get()
    async getUsers(){
        return this.userService.getUsers();
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

    @Get(':username')
    public  getUserByLogin(@Param('username') username: string){
        console.log(this.userService.getUserByLogin(username))
        return this.userService.getUserByLogin(username);
    }


}