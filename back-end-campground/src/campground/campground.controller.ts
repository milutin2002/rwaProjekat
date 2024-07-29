import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Request, UnauthorizedException, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { campgroundDto } from 'src/dtoEntites/campgroundDto';
import { campground } from 'src/models/campground';
import { CampgroundService } from './campground.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AnyFilesInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/MultiFileTypeValidator';
import { ImageService } from 'src/image/image.service';
import { updateCampgroundDto } from 'src/dtoEntites/updateCampgroundDto';

@Controller('campgrounds')
export class CampgroundController {
    br:number=0;
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
        return campgroundAdd;
    }
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FilesInterceptor('files',6,multerOptions))
    @Put()
    public async updateCampground(@Body()campground:updateCampgroundDto,@Request() req,@UploadedFiles() files: Array<Express.Multer.File>){
        try{
        this.br++;
        console.log(campground);
        if(req.user.id==parseInt(campground.userId)){
            console.log("Ugradio sam slike");
            await this.imageServie.saveImages(files,parseInt(campground.id));
            await this.imageServie.deleteSelectedImages(campground.deletedImages);
            return this.service.updateCampground(campground);
        }
        }catch(e){
            console.log(e);
        }
        console.log("Nema authorisazaciju");
        throw new UnauthorizedException();
    }
    @UseGuards(JwtAuthGuard)
    @Delete(":id")
    public async delectCampground(@Param('id',ParseIntPipe)id:number,@Request()req){
        console.log(req.user);
        await this.imageServie.deleteImages(id);
        await this.service.deleteCampground(id,req.user.id);
        return id;
    }
}
