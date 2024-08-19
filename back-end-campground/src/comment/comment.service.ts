import { Get, Injectable, NotFoundException, Param, ParseIntPipe, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { commentDto } from 'src/dtoEntites/commentDto';
import { comment } from 'src/models/comment';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';

@Injectable()
export class CommentService {
    constructor(@InjectRepository(comment)private commentRepository:Repository<comment>,private userService:UsersService){

    }
    public async addComment(id:number,commentDto:commentDto){
        const commentAdd=this.commentRepository.create({...commentDto,userId:id,date:new Date()});
        const user=await this.userService.findById(commentAdd.userId);
        const savedComment=await this.commentRepository.save(commentAdd);
        savedComment.user={id:user.id,username:user.username,password:'',profilePicture:user.profilePicture,campgrounds:[],comments:[]};
        return savedComment;
    }
    public async getComments(campgroundId:number){
        const comments=await this.commentRepository.find({where:{campgroundId:campgroundId},relations:{
            user:true
        }});
        return {comments:comments};
    }
    public async updateComment(comment:comment){
        await this.commentRepository.update(comment.id,comment);
        return this.commentRepository.findOneBy({"id":comment.id});
    }
    public async deleteComment(id:number,userId:number){
        const comment=await this.commentRepository.findOneBy({"id":id});
        if(!comment){
            throw new NotFoundException();
        }
        if(comment.userId===userId){
            return this.commentRepository.delete(id);
        }
        throw new UnauthorizedException();
    }
    public deleteCommentsByCamp(id:number){
        return this.commentRepository.delete({"campgroundId":id});
    }
}
