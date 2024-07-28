import { campground } from "src/models/campground";

export interface updateCampgroundDto{
    id:string,
    title:string,
    content:string,
    userId:string
}