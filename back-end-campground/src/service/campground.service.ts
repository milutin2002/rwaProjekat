
import {Get, Injectable, Param, ParseIntPipe} from '@nestjs/common'
import { campground } from 'src/models/campground';

@Injectable()
export class CampgroundService {
  list:campground[]=[{"id":1,"title":"camp1","content":"Sadrzaj 1","slika":"https://upload.wikimedia.org/wikipedia/commons/5/58/Izvir_temenice.JPG"},{"id":2,"title":"camp2","content":"Sadrzaj 2","slika":"https://upload.wikimedia.org/wikipedia/commons/5/58/Izvir_temenice.JPG"},{"id":3,"title":"camp3","content":"Sadrzaj 3","slika":"https://upload.wikimedia.org/wikipedia/commons/5/58/Izvir_temenice.JPG"}]

  getCampgrounds():campground[]{
    return this.list;
  }
  public getCampgroundById(id:number){
    return this.list.find(b=>b.id===id);
  }
}
