import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { comment } from '../models/comment';
import { commentDto } from '../dtoEntities/commentDto';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private httpClient:HttpClient) { }
  getComments(id:number):Observable<{comments:comment[]}>{
    return this.httpClient.get<{comments:comment[]}>("http://localhost:3000/comment/"+id);
  }
  postComment(commentDto:commentDto):Observable<comment>{
    return this.httpClient.post<comment>("http://localhost:3000/comment",commentDto);
  }
  updateComment(comment:comment):Observable<comment>{
    return this.httpClient.put<comment>("http://localhost:3000/comment",comment);
  }
  deleteComment(id:number):Observable<number>{
    return this.httpClient.delete<number>("http://localhost:3000/comment/"+id);
  }
}
