import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CampgroundController } from './campground/campground.controller';
import { CampgroundService } from './campground/campground.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { campground } from './models/campground';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { typeOrmConfig } from './typeorm.config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { user } from './models/user';
import { UsersService } from './users/users.service';
import { CommentController } from './comment/comment.controller';
import { CommentService } from './comment/comment.service';
import { comment } from './models/comment';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }),TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: typeOrmConfig,
  }),TypeOrmModule.forFeature([campground,user,comment]),ConfigModule.forRoot(), AuthModule, UsersModule],
  controllers: [AppController, CampgroundController, CommentController],
  providers: [AppService,CampgroundService,UsersService, CommentService],
})
export class AppModule {}
