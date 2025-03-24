import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GoogleMapsService {
  private env: any;
  googleMapsApiKey: string = '';

  constructor(private http: HttpClient) {}

  async loadScript() {
    return new Promise<String>((resolve, reject) => {
      if (window.google) {
        resolve('loaded'); // Google Maps is already loaded
      } else {
        this.http.get<{ scriptUrl: string }>('maps/').subscribe(
          (data) => {
            const script = document.createElement('script');
            script.src = data.scriptUrl;
            script.async = true;
            script.onload = () => resolve('loaded');
            script.onerror = (error) => reject(error);
            document.head.appendChild(script);
          },
          (error) => reject('Failed to load maps script from backend')
        );
      }
    });
  }
}
