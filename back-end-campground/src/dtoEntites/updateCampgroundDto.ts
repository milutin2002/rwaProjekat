import { Transform } from "class-transformer";
import { IsArray, IsInt, IsOptional, IsString } from "class-validator";
import { campground } from "src/models/campground";

export class updateCampgroundDto {
    @IsString()
    title: string;
  
    @IsString()
    content: string;
  
    @IsInt()
    userId: string;
  
    @IsInt()
    id: string;

    @IsString()
    latitude:string

    @IsString()
    longitude:string
  
    @IsOptional()
    deletedImages?: string[] | string;
  }