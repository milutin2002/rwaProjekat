import {createAction,props} from '@ngrx/store';
import { commentDto } from '../../../dtoEntities/commentDto';
import { comment } from '../../../models/comment';

export const addComment=createAction("Add comment",props<{comment:commentDto}>());
export const updateComment=createAction("Update comment",props<{comment:comment}>());
export const addUpdateCommentSuccess=createAction("Add or update comment success",props<{comment:comment}>());
export const deleteComment=createAction("Delete comment",props<{id:number}>());
export const deleteCommentSuccess=createAction("Delete comment success",props<{id:number}>());
export const loadCommentsSuccess=createAction("Load comments",props<{comments:comment[]}>());