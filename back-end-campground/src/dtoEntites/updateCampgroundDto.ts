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
  
    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    deletedImages?: string[];
  }