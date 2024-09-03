import { user } from "./user";

export interface comment{
    id:number,
    content:string,
    data:Date,
    rating:number,
    userId:number
    user:user | null
}