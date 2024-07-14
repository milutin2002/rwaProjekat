import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { user } from "./user";

@Entity()
export class campground{
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    title:string;
    @Column()
    content:string;
    @Column()
    slika:string;
    @ManyToOne(()=>user,(user)=>user.campgrounds)
    user:user
}