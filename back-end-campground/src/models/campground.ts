import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}