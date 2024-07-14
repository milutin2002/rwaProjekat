
import {Get, Injectable, Param, ParseIntPipe} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm';
import { campgroundDto } from 'src/dtoEntites/campgroundDto';
import { campground } from 'src/models/campground';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';

@Injectable()
export class CampgroundService {
  
  constructor(@InjectRepository(campground) private campgroundRepository:Repository<campground>,private userService:UsersService){}
  getCampgrounds(){
    return this.campgroundRepository.find();
  }
  public getCampgroundById(id:number){
    return this.campgroundRepository.findOneBy({"id":id});
  }
  public async addCampground(campgroundDto:campgroundDto,username:string){
    const campgroundAdd=this.campgroundRepository.create(campgroundDto);
    const userAdd=await this.userService.findOne(username);
    campgroundAdd.user=userAdd;
    return await this.campgroundRepository.save(campgroundAdd);
  }
  public async deleteCampground(id:number){
    return await this.campgroundRepository.delete(id);
  }
  public async updateCampground(campground: campground) {
    await this.campgroundRepository.update(campground.id,campground);
    return this.campgroundRepository.findOneBy({"id":campground.id});
  }
}
