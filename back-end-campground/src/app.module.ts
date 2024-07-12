import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CampgroundController } from './campground/campground.controller';
import { CampgroundService } from './service/campground.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { campground } from './models/campground';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { typeOrmConfig } from './typeorm.config';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }),TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: typeOrmConfig,
  }),TypeOrmModule.forFeature([campground]),ConfigModule.forRoot()],
  controllers: [AppController, CampgroundController],
  providers: [AppService,CampgroundService],
})
export class AppModule {}
