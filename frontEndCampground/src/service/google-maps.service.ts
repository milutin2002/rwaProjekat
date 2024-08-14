import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class GoogleMapsService {

  private mapsLoaded = false;

  loadGoogleMaps(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.mapsLoaded) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${environment.googleMapsApiKey}`;
      console.log(script.src);
      script.async = true;
      script.defer = true;
      script.onload = () => {
        this.mapsLoaded = true;
        resolve();
      };
      script.onerror = (error: any) => {
        reject(error);
      };

      document.body.appendChild(script);
    });
  }
}
