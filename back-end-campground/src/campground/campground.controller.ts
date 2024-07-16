import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Request, UnauthorizedException, UseGuards } from '@nestjs/common';
import { campgroundDto } from 'src/dtoEntites/campgroundDto';
import { campground } from 'src/models/campground';
import { CampgroundService } from './campground.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('campgrounds')
export class CampgroundController {
    constructor(private service:CampgroundService){}
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
    @Post()
    public createCampground(@Body()campgroundDto:campgroundDto,@Request() req){
        return this.service.addCampground(campgroundDto,req.user.id);
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
    public delectCampground(@Param('id',ParseIntPipe)id:number,@Request()req){
        console.log(req.user);
        return this.service.deleteCampground(id,req.user.id);
    }
}
