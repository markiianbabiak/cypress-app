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
    await this.loadEnv();
    return new Promise<String>((resolve, reject) => {
      if (window.google) {
        resolve('loaded'); // Google Maps is already loaded
      } else {
        const script = document.createElement('script');
        console.log(this.googleMapsApiKey);
        script.src = `https://maps.googleapis.com/maps/api/js?key=${this.googleMapsApiKey}&libraries=places`;
        script.async = true;
        script.onload = () => resolve('loaded');
        script.onerror = (error) => reject(error);
        document.head.appendChild(script);
      }
    });
  }

  async loadEnv() {
    await this.http
      .get('/env.json')
      .toPromise()
      .then((data) => {
        this.env = data;
        this.googleMapsApiKey = this.env?.googleMapsApiKey || '';
      });
  }
}
