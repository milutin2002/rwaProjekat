import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CampgroundController } from './campground/campground.controller';
import { CampgroundService } from './service/campground.service';

@Module({
  imports: [],
  controllers: [AppController, CampgroundController],
  providers: [AppService,CampgroundService],
})
export class AppModule {}
