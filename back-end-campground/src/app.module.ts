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
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MulterModule } from '@nestjs/platform-express';
import { image } from './models/image';
import { ImageService } from './image/image.service';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }),TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: typeOrmConfig,
  }),TypeOrmModule.forFeature([campground,user,comment,image]),ConfigModule.forRoot(), AuthModule, UsersModule,ServeStaticModule.forRoot({rootPath: join(__dirname, '..', 'public')}),MulterModule.register({dest:"../public"})],
  controllers: [AppController, CampgroundController, CommentController],
  providers: [AppService,CampgroundService,UsersService, CommentService, ImageService],
})
export class AppModule {}
