import {createReducer,on, UPDATE} from '@ngrx/store';
import { campground } from '../../../models/campground';
import * as Actions from './campground.action';
import { Action } from 'rxjs/internal/scheduler/Action';
import { createEntityAdapter, EntityState } from '@ngrx/entity';

export interface CampgroundState extends EntityState<campground>{
    selectCampground:number
}
export interface CampgroundStateOld{
    campgrounds:campground[],
    selectCampground:number | null
};
const adapter=createEntityAdapter<campground>();
export const initialState:CampgroundState=adapter.getInitialState({
    selectCampground:0
});
export const campgroundReducer=createReducer(initialState,on(Actions.selectCampgrounds,(state,{campground})=>{
    return {
        ...state,
        selectCampground:campground
    }
}),on(Actions.loadCampgroundsSuccess,(state,{campgrounds})=>{
    return adapter.setAll(campgrounds,state);
}),on(Actions.addCampgroundSuccess,(state,{campground})=>{
    return adapter.addOne(campground,state);
}),on(Actions.deleteCampgroundSuccess,(state,{id})=>{
    return adapter.removeOne(id,state);
}));