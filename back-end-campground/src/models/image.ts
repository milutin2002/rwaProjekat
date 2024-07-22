import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { campground } from "./campground";

@Entity()
export class image{
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    fileName:string;
    @Column("int",{nullable:true})
    campgroundId:number;
    @ManyToOne(()=>campground,c=>c.images)
    @JoinColumn({name:"campgroundId"})
    campground:campground
}