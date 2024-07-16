import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { user } from "./user";
import { campground } from "./campground";

@Entity()
export class comment{
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    content:string;
    @Column()
    date:Date
    @Column()
    rating:number
    @Column("int", { nullable: true })
    userId: number;
    @ManyToOne(()=>user,(user)=>user.comments)
    @JoinColumn({name:"userId"})
    user:user
    @Column("int",{nullable:true})
    campgroundId:number;
    @ManyToOne(()=>campground,(camp)=>camp.comments)
    @JoinColumn({name:"campgroundId"})
    campground:campground
}