import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { user } from 'src/models/user';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
    constructor(private userService:UsersService,private jwtService:JwtService){}
    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.userService.findOne(username);
        if (user) {
          const isMatch=await bcrypt.compare(pass,user.password);
          if(isMatch){
            const { password, ...result } = user;
            return result;
          }
        }
        return null;
    }
    async login(user:user){
      const payload={username:user.username,id:user.id};
      return {
        access_token:this.jwtService.sign(payload)
      };
    }
}
