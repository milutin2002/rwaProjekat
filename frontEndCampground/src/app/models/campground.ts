import { images } from "./images";

export interface campground{
    id:number,
    title:string,
    content:string,
    images:images[],
    userId:number,
    latitude:number,
    longitude:number
}