import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { userDto } from 'src/dtoEntites/userDto';
import { user } from 'src/models/user';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(user)private userRepository:Repository<user>){

    }
    public async findOne(username:string):Promise<user | null>{
        return this.userRepository.findOneBy({username:username});
    }
    public async registerUser(userDto:userDto){
        const user=this.userRepository.create({username:userDto.username,password:userDto.password,profilePicture:"defaultPicture.jpg"});
        return await this.userRepository.save(user);
    }
}
