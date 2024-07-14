import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
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
    @Column("int", { nullable: true })
    userId: number;
    @ManyToOne(()=>user,(user)=>user.campgrounds)
    @JoinColumn({name:"userId"})
    user:user
}