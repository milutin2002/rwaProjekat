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
    public async deleteSelectedImages(selected:string[]){
        let promises:Promise<any>[]=[];
        for (let i = 0; i <selected.length; i++) {
            promises.push(this.imageRepository.delete({id:parseInt(selected[i])}));
        }
        return Promise.all(promises);
    }
}
