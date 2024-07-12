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

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }),TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: typeOrmConfig,
  }),TypeOrmModule.forFeature([campground,user]),ConfigModule.forRoot(), AuthModule, UsersModule],
  controllers: [AppController, CampgroundController],
  providers: [AppService,CampgroundService,UsersService],
})
export class AppModule {}
