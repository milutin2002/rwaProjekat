import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Request, UnauthorizedException, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { campgroundDto } from 'src/dtoEntites/campgroundDto';
import { campground } from 'src/models/campground';
import { CampgroundService } from './campground.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AnyFilesInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/MultiFileTypeValidator';
import { ImageService } from 'src/image/image.service';

@Controller('campgrounds')
export class CampgroundController {
    constructor(private service:CampgroundService,private imageServie:ImageService){}
    @Get("")
    public getCampgrounds(){
        return this.service.getCampgrounds();
    }
    @UseGuards(JwtAuthGuard)
    @Get("myCampgrounds")
    public getCampgroundById(@Request()req){
        return this.service.getCampgroundByUserId(req.user.id);
    }
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FilesInterceptor('files',6,multerOptions))
    @Post()
    public async createCampground(@Body()campgroundDto:campgroundDto,@Request() req,@UploadedFiles() files: Array<Express.Multer.File>){
        const campgroundAdd:campground=await this.service.addCampground(campgroundDto,req.user.id);
        console.log(files);
        const images=await this.imageServie.saveImages(files,campgroundAdd.id);
        campgroundAdd.images=images;
        const campgroundReturn:any=campgroundAdd;
        campgroundReturn.images=campgroundReturn.images.map(b=>"http://localhost:3000/"+b.fileName);
        console.log(campgroundReturn);
        return campgroundReturn;
    }
    @UseGuards(JwtAuthGuard)
    @Put()
    public updateCampground(@Body()campground:campground,@Request() req){
        console.log(campground);
        console.log(req.user);
        if(req.user.id===campground.userId){
            return this.service.updateCampground(campground);
        }
        throw new UnauthorizedException();
    }
    @UseGuards(JwtAuthGuard)
    @Delete(":id")
    public async delectCampground(@Param('id',ParseIntPipe)id:number,@Request()req){
        console.log(req.user);
        await this.service.deleteCampground(id,req.user.id);
        return id;
    }
}
