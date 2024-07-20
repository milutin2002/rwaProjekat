import {createAction,props} from '@ngrx/store';
import { campground } from '../../../models/campground';
import { user } from '../../../models/user';
export const loadUser=createAction("Load user");
export const loadUserSuccess=createAction("Load user success",props<{user:user}>());
export const updateUser=createAction("Update user",props<{data:FormData}>());