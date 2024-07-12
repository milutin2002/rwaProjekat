import { Body, Controller, Post } from '@nestjs/common';
import { userDto } from 'src/dtoEntites/userDto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private userService:UsersService){}
    @Post("register")
    public registerUser(@Body() userDto:userDto){
        return this.userService.registerUser(userDto);
    }
}
