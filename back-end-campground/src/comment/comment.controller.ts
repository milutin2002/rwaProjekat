import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post ,Put,Request, UnauthorizedException, UseGuards} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { commentDto } from 'src/dtoEntites/commentDto';
import { CommentService } from './comment.service';
import {comment} from '../models/comment';

@Controller('comment')
export class CommentController {
    constructor(private commentService:CommentService){}
    @UseGuards(JwtAuthGuard)
    @Get(":id")
    getComments( @Param('id',ParseIntPipe)id:number,@Request()req){
        return this.commentService.getComments(id,req.user.id);
    }
    @UseGuards(JwtAuthGuard)
    @Post()
    createComment(@Request() req,@Body()comment:commentDto){
        return this.commentService.addComment(req.user.id,comment);
    }
    @UseGuards(JwtAuthGuard)
    @Put("")
    updateComment(@Request() req,@Body()comment:comment){
        if(comment.userId===req.user.id){
            return this.commentService.updateComment(comment);
        }
        throw new UnauthorizedException();
    }
    @UseGuards(JwtAuthGuard)
    @Delete(":id")
    async deleteComment(@Param('id',ParseIntPipe)id:number,@Request() req){
        await this.commentService.deleteComment(id,req.user.id);
        return id;
    }
}
