import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  WritableSignal,
  signal,
} from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { GoogleMapsService } from '../../services/google-maps.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AutocompleteInputComponent } from '../autocomplete-input/autocomplete-input.component';
import { ViewNavigationComponent } from '../view-navigation/view-navigation.component';
import { MatDialog } from '@angular/material/dialog';
import { CreateReportModalComponent } from '../create-report-modal/create-report-modal.component';
import { ReportService } from '../../services/report.service';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [
    GoogleMapsModule,
    CommonModule,
    FormsModule,
    AutocompleteInputComponent,
    ViewNavigationComponent,
  ],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  @ViewChild('mapRef', { static: false }) mapElement!: ElementRef;

  zoom = 16;
  selectedAddress: WritableSignal<string | null> = signal(null); // Nullable address
  center: WritableSignal<{ lat: number; lng: number }> = signal({
    lat: 43.65883681584811,
    lng: -79.37932890768772,
  });

  isMapLoaded: boolean = false;
  infoWindow!: google.maps.InfoWindow;
  map!: google.maps.Map;
  marker!: google.maps.marker.AdvancedMarkerElement | null; // Nullable marker
  constructor(
    private googleMapsService: GoogleMapsService,
    private reportService: ReportService,
    public dialog: MatDialog
  ) {}

  async ngOnInit() {
    await this.loadMap();

    this.infoWindow = new google.maps.InfoWindow({
      content: '',
      ariaLabel: 'Location Info',
      headerContent: 'Create a Report',
    });
  }

  async loadMap() {
    await this.googleMapsService
      .loadScript()
      .then(() => {
        console.log('Google Maps script loaded');
        this.isMapLoaded = true;
        this.initMap();
      })
      .catch((error) => {
        console.error('Error loading Google Maps script', error);
      });
  }

  initMap() {
    if (!this.mapElement?.nativeElement) {
      console.error('Map element not found');
      return;
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      center: this.center(),
      zoom: this.zoom,
      mapId: '979f8a092cc9b1ea',
    });

    console.log('Map initialized:', this.map);
  }

  getAddress(event: Object) {
    console.log(event);
    const place = event as google.maps.places.PlaceResult;

    console.log(place);

    if (!place || !place.geometry) {
      console.error('Invalid place result:', place);
      return;
    }

    const formattedAddress = place.formatted_address ?? null;
    this.selectedAddress.set(formattedAddress);

    const location = place.geometry.location;
    console.log(location);
    if (location) {
      const newLatLng = { lat: location.lat(), lng: location.lng() };

      this.center.set(newLatLng);
      this.map.setCenter(newLatLng);

      if (formattedAddress) {
        this.addMarker(newLatLng);
        this.infoWindow.setContent(
          `<p><strong>Location: </strong>${this.selectedAddress()}</p><button id="createReportBtn">Create a report</button>`
        );
        this.infoWindow.open(this.map, this.marker);

        setTimeout(() => {
          document
            .getElementById('createReportBtn')
            ?.addEventListener('click', () => {
              this.openCreateReportModal();
            });
        }, 100);
      }
    }
  }

  addMarker(position: { lat: number; lng: number }) {
    this.marker = new google.maps.marker.AdvancedMarkerElement({
      position: position,
      map: this.map,
      gmpClickable: true,
    });

    this.marker.addListener('gmp-click', () => {
      this.infoWindow.setContent(
        `<p><strong>Location: </strong>${this.selectedAddress()}</p><button type="button" (click)="openCreateReportModal()">Create a report</button>`
      );
      this.infoWindow.open(this.map, this.marker);
    });
  }

  openCreateReportModal(): void {
    const dialogRef = this.dialog.open(CreateReportModalComponent, {
      width: '400px', // Set width if needed
      data: { location: this.selectedAddress() },
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        await this.reportService.create(result);
      }
    });
  }
}
