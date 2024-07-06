import { createSelector } from "@ngrx/store";
import { AppState } from "../../app.state";

export const selectCampgroundFeature=createSelector((state:AppState)=>state.campgrounds,(campgrounds)=>campgrounds);
export const selectCampgroundList=createSelector(selectCampgroundFeature,(campground)=>campground.campgrounds);
export const selectCampground=createSelector(selectCampgroundFeature,(campground)=>campground.selectCampground);
export const selectCampgroundObject=createSelector(selectCampgroundList,selectCampground,(s1,s2)=>s1.find(x=>x.id==s2));