import {createAction,props} from '@ngrx/store';
export const loadCampgrounds=createAction("Load campgrounds");
export const loadCampgroundsSuccess=createAction("Load campgrounds success");
export const selectCampgrounds=createAction("Select campground",props<{campgroundId:number}>());