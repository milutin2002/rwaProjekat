import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { comment } from '../../../models/comment';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { AppState } from '../../app.state';
import { Store } from '@ngrx/store';
import { selectCommentList } from '../../store/comment/comment.selection';
@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrl: './comment-list.component.css'
})
export class CommentListComponent {
  faStar = faStar;
  comments$:Observable<comment[]>=of([]);
  constructor(private store:Store<AppState>){
    this.comments$=store.select(selectCommentList);
  }
}
