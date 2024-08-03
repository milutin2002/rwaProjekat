import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
showToolbar: boolean =false;
private noToolbarRoutes: string[] = ['/', '/registracija'];
constructor(private router: Router) {
  this.router.events.subscribe(event => {
    if (event instanceof NavigationEnd) {
      this.showToolbar = !this.noToolbarRoutes.includes(event.urlAfterRedirects);
    }
  });
}
  
}
