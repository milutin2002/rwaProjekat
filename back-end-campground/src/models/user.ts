import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { campground } from "./campground";
import { comment } from "./comment";

@Entity()
export class user{
    @PrimaryGeneratedColumn()
    id:number
    @Column()
    username:string
    @Column()
    password:string
    @Column()
    profilePicture:string
    @OneToMany(()=>campground,camp=>camp.user)
    campgrounds:campground[]
    @OneToMany(()=>comment,comment=>comment.user)
    comments:comment[]
}