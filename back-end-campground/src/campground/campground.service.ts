
import {Get, Injectable, Param, ParseIntPipe, UnauthorizedException} from '@nestjs/common'
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
  public async getCampgroundById(id:number){
    return this.campgroundRepository.findOneBy({"id":id});
  }
  public async addCampground(campgroundDto:campgroundDto,id:number){
    const campgroundAdd=this.campgroundRepository.create(campgroundDto);
    campgroundAdd.userId=id;
    return await this.campgroundRepository.save(campgroundAdd);
  }
  public async deleteCampground(id:number,idU:number){
    const campgroundToDelete=await this.getCampgroundById(id);
    if(campgroundToDelete.userId===idU){
      return await this.campgroundRepository.delete(id);
    }
    throw new UnauthorizedException();
  }
  public async updateCampground(campground: campground) {
    await this.campgroundRepository.update(campground.id,campground);
    return this.campgroundRepository.findOneBy({"id":campground.id});
  }
}
