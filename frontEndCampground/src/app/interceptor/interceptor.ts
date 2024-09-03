import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../service/user-service.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private logingService:UserService){
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.logingService.getToken();
    if (token) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', token)
      });
      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}
