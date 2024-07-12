
import {Get, Injectable, Param, ParseIntPipe} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm';
import { campgroundDto } from 'src/dtoEntites/campgroundDto';
import { campground } from 'src/models/campground';
import { Repository } from 'typeorm';

@Injectable()
export class CampgroundService {
  
  list:campground[]=[{"id":1,"title":"camp1","content":"Sadrzaj 1","slika":"https://upload.wikimedia.org/wikipedia/commons/5/58/Izvir_temenice.JPG"},{"id":2,"title":"camp2","content":"Sadrzaj 2","slika":"https://upload.wikimedia.org/wikipedia/commons/5/58/Izvir_temenice.JPG"},{"id":3,"title":"camp3","content":"Sadrzaj 3","slika":"https://upload.wikimedia.org/wikipedia/commons/5/58/Izvir_temenice.JPG"}]
  constructor(@InjectRepository(campground) private campgroundRepository:Repository<campground>){}
  getCampgrounds(){
    return this.campgroundRepository.find();
  }
  public getCampgroundById(id:number){
    return this.campgroundRepository.findOneBy({"id":id});
  }
  public async addCampground(campgroundDto:campgroundDto){
    const campground=this.campgroundRepository.create(campgroundDto);
    return await this.campgroundRepository.save(campground);
  }
  public async deleteCampground(id:number){
    return await this.campgroundRepository.delete(id);
  }
  public async updateCampground(campground: campground) {
    return await this.campgroundRepository.update(campground.id,campground);
  }
}
