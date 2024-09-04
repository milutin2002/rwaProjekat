import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, Request, UnauthorizedException, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
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
    constructor(private service:CampgroundService,private imageServie:ImageService){}
    @Get("")
    public getCampgrounds(@Query("page",ParseIntPipe)page:number=0,@Query("pageSize",ParseIntPipe)pageSize:number=5,@Query("search")search:string){
        return this.service.getCampgrounds(page,pageSize,search);
    }
    @UseGuards(JwtAuthGuard)
    @Get("myCampgrounds")
    public getCampgroundById(@Request()req,@Query("page",ParseIntPipe)page:number=0,@Query("pageSize",ParseIntPipe)pageSize:number=5,@Query("search")search:string){
        return this.service.getCampgroundByUserId(req.user.id,page,pageSize,search);
    }
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FilesInterceptor('files',6,multerOptions))
    @Post()
    public async createCampground(@Body()campgroundDto:campgroundDto,@Request() req,@UploadedFiles() files: Array<Express.Multer.File>){
        const campgroundAdd:campground=await this.service.addCampground({...campgroundDto,latitude: parseFloat(campgroundDto.latitude),
            longitude: parseFloat(campgroundDto.longitude)},req.user.id);
        const images=await this.imageServie.saveImages(files,campgroundAdd.id);
        campgroundAdd.images=images;
        return campgroundAdd;
    }
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FilesInterceptor('files',6,multerOptions))
    @Put()
    public async updateCampground(@Body()campground:updateCampgroundDto,@Request() req,@UploadedFiles() files: Array<Express.Multer.File>){
        if(req.user.id==parseInt(campground.userId)){
            await this.imageServie.saveImages(files,parseInt(campground.id));
            if(campground.deletedImages){
                if(Array.isArray(campground.deletedImages)){
                    await this.imageServie.deleteSelectedImages(campground.deletedImages);
                }
                else{
                    await this.imageServie.deleteSelectedImages([campground.deletedImages]);
                }
            }
            return this.service.updateCampground(campground);
        }
        throw new UnauthorizedException();
    }
    @UseGuards(JwtAuthGuard)
    @Delete(":id")
    public async delectCampground(@Param('id',ParseIntPipe)id:number,@Request()req){
        await this.service.deleteCampground(id,req.user.id);
        return id;
    }
}
