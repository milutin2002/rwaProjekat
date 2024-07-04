import {createReducer,on} from '@ngrx/store';
import { campground } from '../../../models/campground';
import * as Actions from './campground.action';
import { Action } from 'rxjs/internal/scheduler/Action';

export interface CampgroundState{
    campgrounds:campground[],
    selectCampground:campground | null
};
export const initialState:CampgroundState={
    campgrounds:[],
    selectCampground:null
};
export const campgroundReducer=createReducer(initialState,on(Actions.selectCampgrounds,(state,{campground})=>{
    return {
        ...state,
        selectCampground:campground
    }
}))