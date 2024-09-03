
import {Get, Injectable, Param, ParseIntPipe, UnauthorizedException} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm';
import { RelationshipType } from 'sequelize/types/errors/database/foreign-key-constraint-error';
import { CommentService } from 'src/comment/comment.service';
import { campgroundDto } from 'src/dtoEntites/campgroundDto';
import { updateCampgroundDto } from 'src/dtoEntites/updateCampgroundDto';
import { ImageService } from 'src/image/image.service';
import { campground } from 'src/models/campground';
import { image } from 'src/models/image';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';

@Injectable()
export class CampgroundService {
  
  constructor(@InjectRepository(campground) private campgroundRepository:Repository<campground>,private imageService:ImageService,private commentService:CommentService){}
  getCampgrounds(page:number,pageSize:number){
    return this.campgroundRepository.find({relations:{images:true},skip:page*pageSize,take:pageSize});
  }
  public async getCampgroundByUserId(id:number,page:number,pageSize:number){
    const res=await this.campgroundRepository.find({relations:{
      images:true
    },where:{
      userId:id
    },skip:page*pageSize,take:pageSize});
    return res; 
  }
  public async getCampgroundById(id:number){
    const res=await this.campgroundRepository.findOneBy({"id":id});
    return res;
  }
  public async addCampground(campgroundDto:Omit<campgroundDto, 'latitude' | 'longitude'> & { latitude: number; longitude: number },id:number){
    const campgroundAdd=this.campgroundRepository.create(campgroundDto);
    campgroundAdd.userId=id;
    return await this.campgroundRepository.save(campgroundAdd);
  }
  public async deleteCampground(id:number,idU:number){
    const campgroundToDelete=await this.getCampgroundById(id);
    if(campgroundToDelete.userId===idU){
      await this.imageService.deleteImages(id);
      await this.commentService.deleteCommentsByCamp(id);
      return await this.campgroundRepository.delete(id);
    }
    throw new UnauthorizedException();
  }
  public async updateCampground(campground: updateCampgroundDto) {
    await this.campgroundRepository.update(parseInt(campground.id),{title:campground.title,content:campground.content,userId:parseInt(campground.userId),id:parseInt(campground.id),latitude:parseFloat(campground.latitude),longitude:parseFloat(campground.longitude)});
    let res= await this.campgroundRepository.find({where:{"id":parseInt(campground.id)},relations:{
      images:true
    },take:1});
    return res[0];
  }
}
