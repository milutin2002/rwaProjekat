import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { userDto } from 'src/dtoEntites/userDto';
import { user } from 'src/models/user';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import passport from 'passport';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(user)private userRepository:Repository<user>){

    }
    public async findOne(username:string):Promise<user | null>{
        return this.userRepository.findOneBy({username:username});
    }
    public async registerUser(userDto:userDto){
        const saltRounds=10;
        const password=await bcrypt.hash(userDto.password,saltRounds);
        const user=this.userRepository.create({username:userDto.username,password:password,profilePicture:"defaultPicture.jpg"});
        const savedUser=await this.userRepository.save(user);
        return {id:savedUser.id,username:savedUser.username,profilePicture:savedUser.profilePicture};
    }
}
