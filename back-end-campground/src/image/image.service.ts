import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { image } from 'src/models/image';
import { Repository } from 'typeorm/repository/Repository';


@Injectable()
export class ImageService {
    constructor(@InjectRepository(image)private imageRepository:Repository<image>){
    }
    public async saveImages(files: Array<Express.Multer.File>,id:number){
        let images:Promise<image>[]=[];
        for(let i=0;i<files.length;i++){
            let imageAdd=this.imageRepository.create({fileName:files[i].filename,campgroundId:id});
            images.push(this.imageRepository.save(imageAdd));
        }
        return Promise.all(images);
    }
    public async deleteImages(campId:number){
        return this.imageRepository.delete({"campgroundId":campId});
    }
}
