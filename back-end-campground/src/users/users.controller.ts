import { Body, Controller, HttpStatus, ParseFilePipeBuilder, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { userDto } from 'src/dtoEntites/userDto';
import { UsersService } from './users.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { user } from 'src/models/user';
import { userDto2 } from 'src/dtoEntites/userDto2';

@Controller('users')
export class UsersController {
    constructor(private userService:UsersService){}
    @Post("register")
    public registerUser(@Body() userDto:userDto){
        return this.userService.registerUser(userDto);
    }

    @Put()
    @UseInterceptors(FileInterceptor('file'))
    uploadFile(@Body()userUpdated:userDto2,@UploadedFile(
        new ParseFilePipeBuilder()
          .addFileTypeValidator({
            fileType: 'jpeg',
          })
          .addMaxSizeValidator({
            maxSize: 1000
          })
          .build({
            errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
          }),
      ) file: Express.Multer.File) {
        return this.userService.updateUser({...userUpdated,profilePicture:file.filename})
    }
}
