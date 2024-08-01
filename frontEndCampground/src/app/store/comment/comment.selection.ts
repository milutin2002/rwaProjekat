import { createSelector } from "@ngrx/store";
import { AppState } from "../../app.state";
export const selectCommentFeature=createSelector((state:AppState)=>state.comment,(comment)=>comment);
export const selectCommentUserComment=createSelector(selectCommentFeature,s=>s.userComment);
