import { createSelector } from "@ngrx/store";
import { AppState } from "../../app.state";
import { campground } from "../../../models/campground";

export const selectCampgroundFeature=createSelector((state:AppState)=>state.campgrounds,(campgrounds)=>campgrounds);
export const selectCampgroundList=createSelector(selectCampgroundFeature,(campground)=>campground.ids.map(x=><campground>campground.entities[x]));
export const selectCampground=createSelector(selectCampgroundFeature,(campground)=>campground.selectCampground);
export const selectCampgroundObject=createSelector(selectCampgroundList,selectCampground,(s1,s2)=>s1.find(x=>x.id==s2));