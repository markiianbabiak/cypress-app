import { Component, OnInit } from '@angular/core';
import { ViewNavigationComponent } from '../view-navigation/view-navigation.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { GoogleMapsService } from '../../services/google-maps.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-map',
  imports: [ViewNavigationComponent, GoogleMapsModule, CommonModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
})
export class MapComponent implements OnInit {
  center = { lat: 43.65883681584811, lng: -79.37932890768772 }; // Set the center of the map
  zoom = 16; // Set the zoom level
  markerPosition = { lat: 43.65883681584811, lng: -79.37932890768772 };

  isMapLoaded: boolean = false;

  constructor(private googleMapsService: GoogleMapsService) {}

  async ngOnInit() {
    await this.loadMap();
  }

  async loadMap() {
    await this.googleMapsService
      .loadScript()
      .then(() => {
        console.log('Google Maps script loaded');
        this.isMapLoaded = true;
      })
      .catch((error) => {
        console.error('Error loading Google Maps script', error);
      });
  }
}
