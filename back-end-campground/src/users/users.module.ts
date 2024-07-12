import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { user } from 'src/models/user';
import { UsersController } from './users.controller';

@Module({
  imports:[TypeOrmModule.forFeature([user])],
  providers: [UsersService],
  exports:[UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
