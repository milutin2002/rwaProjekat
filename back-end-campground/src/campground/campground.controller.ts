import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { campgroundDto } from 'src/dtoEntites/campgroundDto';
import { campground } from 'src/models/campground';
import { CampgroundService } from 'src/service/campground.service';

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
    @Post()
    public createCampground(@Body()campgroundDto:campgroundDto){
        return this.service.addCampground(campgroundDto);
    }
    @Put()
    public updateCampground(@Body()campground:campground){
        return this.service.updateCampground(campground);
    }
    @Delete(":id")
    public delectCampground(@Param('id',ParseIntPipe)id:number){
        return this.service.deleteCampground(id);
    }
}
