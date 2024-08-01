import { user } from "./user";

export interface comment{
    id:number,
    content:string,
    data:Date,
    rating:number,
    user:user | null
}