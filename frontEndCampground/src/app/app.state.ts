import { CampgroundState } from "./store/campground/campground.reduce";
import { UserState } from "./store/user/user.reduce";

export interface AppState{
    campgrounds:CampgroundState,
    user:UserState
}