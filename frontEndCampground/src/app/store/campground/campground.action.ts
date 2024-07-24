import {createAction,props} from '@ngrx/store';
import { campground } from '../../../models/campground';
export const loadCampgrounds=createAction("Load campgrounds");
export const loadCampgroundsSuccess=createAction("Load campgrounds success",props<{campgrounds:campground[]}>());
export const selectCampgrounds=createAction("Select campground",props<{campground:number}>());
export const addCampground=createAction("Add campground",props<{formData:FormData}>());
export const addCampgroundSuccess=createAction("Add campground success",props<{campground:campground}>());
export const deleteCampground=createAction("Delete campground",props<{id:number}>());
export const deleteCampgroundSuccess=createAction("Delete campground success",props<{id:number}>());