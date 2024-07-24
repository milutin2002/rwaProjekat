import {createReducer,on, UPDATE} from '@ngrx/store';
import { campground } from '../../../models/campground';
import * as Actions from './campground.action';
import { Action } from 'rxjs/internal/scheduler/Action';
import { createEntityAdapter, EntityState } from '@ngrx/entity';

export interface CampgroundState extends EntityState<campground>{
    selectCampground:number,
    deletedCampground:number | null
}
export interface CampgroundStateOld{
    campgrounds:campground[],
    selectCampground:number | null,
    deletedCampground:number | null
};
const adapter=createEntityAdapter<campground>();
export const initialState:CampgroundState=adapter.getInitialState({
    selectCampground:0,
    deletedCampground:null
});
export const campgroundReducer=createReducer(initialState,on(Actions.selectCampgrounds,(state,{campground})=>{
    return {
        ...state,
        selectCampground:campground,
        deletedCampground:null
    }
}),on(Actions.loadCampgroundsSuccess,(state,{campgrounds})=>{
    return adapter.setAll(campgrounds,{...state,deletedCampground:null});
}),on(Actions.addCampgroundSuccess,(state,{campground})=>{
    return adapter.addOne(campground,{...state,deletedCampground:null});
}),on(Actions.deleteCampgroundSuccess,(state,{id})=>{
    return adapter.removeOne(id,{...state,deletedCampground:id});
}));