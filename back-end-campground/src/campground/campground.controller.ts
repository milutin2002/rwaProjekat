import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Request, UseGuards } from '@nestjs/common';
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
    @Get(":id")
    public getCampgroundById(@Param('id',ParseIntPipe)id:number){
        return this.service.getCampgroundById(id);
    }
    @UseGuards(JwtAuthGuard)
    @Post()
    public createCampground(@Body()campgroundDto:campgroundDto,@Request() req){
        return this.service.addCampground(campgroundDto,req.user.id);
        //return "Authorized";
    }
    @Put()
    public updateCampground(@Body()campground:campground){
        return this.service.updateCampground(campground);
    }
    @UseGuards(JwtAuthGuard)
    @Delete(":id")
    public delectCampground(@Param('id',ParseIntPipe)id:number,@Request()req){
        console.log(req.user);
        return this.service.deleteCampground(id,req.user.id);
    }
}
