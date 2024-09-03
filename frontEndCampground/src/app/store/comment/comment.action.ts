import {createAction,props} from '@ngrx/store';
import { commentDto } from '../../dtoEntities/commentDto';
import { comment } from '../../models/comment';

export const addComment=createAction("Add comment",props<{comment:commentDto}>());
export const updateComment=createAction("Update comment",props<{comment:comment}>());
export const addCommentSuccess=createAction("Add comment success",props<{comment:comment}>());
export const updateCommentSuccess=createAction("Update comment success",props<{comment:comment}>());
export const deleteComment=createAction("Delete comment",props<{id:number}>());
export const deleteCommentSuccess=createAction("Delete comment success",props<{id:number}>());
export const loadCommentsSuccess=createAction("Load comments",props<{comments:comment[]}>());