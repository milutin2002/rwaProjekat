import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { comment } from "../../../models/comment";
import { createReducer, on } from "@ngrx/store";
import * as CommentActions from './comment.action';

export interface CommentState extends EntityState<comment>{
    userComment:comment | null
}
const adapter=createEntityAdapter<comment>();
export const initialState:CommentState=adapter.getInitialState({
    userComment:null
});
export const commentReducer=createReducer(initialState,on(CommentActions.addUpdateCommentSuccess,(state,{comment})=>{
    return {...state,userComment:comment};
}));