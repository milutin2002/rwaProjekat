import { createSelector } from "@ngrx/store";
import { AppState } from "../../app.state";
import { selectUser } from "../user/user.selection";
import { comment } from "../../../models/comment";
export const selectCommentFeature=createSelector((state:AppState)=>state.comment,(comment)=>comment);
/*export const selectCommentUserComment=createSelector(selectCommentFeature,selectUser,(s1,s2)=>{
    return {userComment:s1.userComment,user:s2};
});*/
export const selectCommentList=createSelector(selectCommentFeature,(commnetState)=>commnetState.ids.map(x=><comment>commnetState.entities[x]));
export const selectCommentUserComment=createSelector(selectUser,selectCommentList,(s1,s2)=>{
    if(s1===null){
        return {userComment:null,user:s1};
    }
    const comment=s2.find(x=>x.user?.id===s1.id);
    if(!comment){
        return {userComment:null,user:s1};
    }
    return {userComment:comment,user:s1};
})
