import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { comment } from "../../../models/comment";
import { createReducer, on } from "@ngrx/store";
import * as CommentActions from './comment.action';

export interface CommentState extends EntityState<comment>{
}
const adapter=createEntityAdapter<comment>();
export const initialState:CommentState=adapter.getInitialState({
    userComment:null
});
export const commentReducer=createReducer(initialState,on(CommentActions.addUpdateCommentSuccess,(state,{comment})=>{
    return adapter.addOne(comment,state);
}),on(CommentActions.loadCommentsSuccess,(state,{comments})=>{
    return adapter.setAll(comments,state);
}),on(CommentActions.deleteCommentSuccess,(state,{id})=>{
    return adapter.removeOne(id,state);
}));