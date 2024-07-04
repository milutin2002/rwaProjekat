import {createAction,props} from '@ngrx/store';
import { campground } from '../../../models/campground';
export const loadCampgrounds=createAction("Load campgrounds");
export const loadCampgroundsSuccess=createAction("Load campgrounds success");
export const selectCampgrounds=createAction("Select campground",props<{campground:campground}>());