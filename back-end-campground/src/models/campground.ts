import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { user } from "./user";
import { comment } from "./comment";
import { image } from "./image";

@Entity()
export class campground{
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    title:string;
    @Column()
    content:string;
    @Column("float")
    latitude:number
    @Column("float")
    longitude:number
    @Column("int", { nullable: true })
    userId: number;
    @ManyToOne(()=>user,(user)=>user.campgrounds)
    @JoinColumn({name:"userId"})
    user:user
    @OneToMany(()=>comment,comment=>comment.user)
    comments:comment[]
    @OneToMany(()=>image,i=>i.campground)
    images:image[]
}