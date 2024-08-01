import { CampgroundState } from "./store/campground/campground.reduce";
import { CommentState } from "./store/comment/comment.reduce";
import { UserState } from "./store/user/user.reduce";

export interface AppState{
    campgrounds:CampgroundState,
    user:UserState,
    comment:CommentState
}