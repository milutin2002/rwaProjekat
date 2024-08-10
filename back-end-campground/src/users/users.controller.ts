import { Body, Controller, Get, HttpStatus, Param, ParseFilePipeBuilder, ParseIntPipe, Post, Put, Request, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { userDto } from 'src/dtoEntites/userDto';
import { UsersService } from './users.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { user } from 'src/models/user';
import { userDto2 } from 'src/dtoEntites/userDto2';
import { multerOptions } from 'src/MultiFileTypeValidator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
    constructor(private userService:UsersService){}
    @Post("register")
    public registerUser(@Body() userDto:userDto){
        return this.userService.registerUser(userDto);
    }
    @UseGuards(JwtAuthGuard)
    @Put()
    @UseInterceptors(FileInterceptor('file',multerOptions))
    uploadFile(@Body()userUpdated:userDto2,@UploadedFile(
       ) file: Express.Multer.File,@Request()req) {
        const updateBody={username:userUpdated.username,id:req.user.id};
        if(file){
            updateBody["profilePicture"]=file.filename;
        }
        return this.userService.updateUser(updateBody);
    }
    @Get(":username")
    doubleUsername(@Param('username')username:string){
        return this.userService.doubleUsername(username);
    }
}
