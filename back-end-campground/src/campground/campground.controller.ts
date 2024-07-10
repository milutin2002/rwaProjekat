import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
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
}
