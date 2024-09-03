import {createReducer,on, UPDATE} from '@ngrx/store';
import { campground } from '../../models/campground';
import * as Actions from './campground.action';
import { Action } from 'rxjs/internal/scheduler/Action';
import { createEntityAdapter, EntityState } from '@ngrx/entity';

export interface CampgroundState extends EntityState<campground>{
    selectCampground:number
}
const adapter=createEntityAdapter<campground>();
export const initialState:CampgroundState=adapter.getInitialState({
    selectCampground:0
});
export const campgroundReducer=createReducer(initialState,on(Actions.selectCampgrounds,(state,{campground})=>{
    return {
        ...state,
        selectCampground:campground,
        deletedCampground:null,
        updatedCampground:null
    }
}),on(Actions.loadCampgroundsSuccess,(state,{campgrounds})=>{
    return adapter.setAll(campgrounds,{...state,deletedCampground:null,updatedCampground:null});
}),on(Actions.addCampgroundSuccess,(state,{campground})=>{
    return adapter.addOne(campground,{...state,deletedCampground:null,updatedCampground:null});
}),on(Actions.deleteCampgroundSuccess,(state,{id})=>{
    return adapter.removeOne(id,{...state,deletedCampground:id,updatedCampground:null});
}),on(Actions.updateCampgroundSuccess,(state,{campground})=>{
    if(!campground){
        return state;
    }
    return adapter.updateOne({ id: campground.id, changes: campground }, {
        ...state,
        deletedCampground: null,
        updatedCampground: campground
      });
}));