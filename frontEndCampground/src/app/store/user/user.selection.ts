import { createSelector } from "@ngrx/store";
import { AppState } from "../../app.state";
import { user } from "../../../models/user";

export const selectUserFeature=createSelector((state:AppState)=>state.user,(user)=>user);
export const selectUser=createSelector(selectUserFeature,(s)=>s.user);
export const selectPage=createSelector(selectUserFeature,s=>s.page);