import { Get, Injectable, NotFoundException, Param, ParseIntPipe, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { commentDto } from 'src/dtoEntites/commentDto';
import { comment } from 'src/models/comment';
import { Repository } from 'typeorm';

@Injectable()
export class CommentService {
    constructor(@InjectRepository(comment)private commentRepository:Repository<comment>){

    }
    public async addComment(id:number,commentDto:commentDto){
        const commentAdd=this.commentRepository.create({...commentDto,userId:id,date:new Date()});
        return this.commentRepository.save(commentAdd);
    }
    public async getComments(campgroundId:number,userId:number){
        const userComments=await this.commentRepository.findOneBy({userId:userId,campgroundId:campgroundId});
        const comments=await this.commentRepository.find({where:{campgroundId:campgroundId},relations:{
            user:true
        }});
        return {userComments:userComments,comments:comments};
    }
    public async updateComment(comment:comment){
        await this.commentRepository.update(comment.id,comment);
        return this.commentRepository.findOneBy({"id":comment.id});
    }
    public async deleteComment(id:number,userId:number){
        const comment=await this.commentRepository.findOneBy({"id":id});
        console.log(comment,id);
        if(!comment){
            throw new NotFoundException();
        }
        if(comment.userId===userId){
            return this.commentRepository.delete(id);
        }
        throw new UnauthorizedException();
    }
}
