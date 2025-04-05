import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  WritableSignal,
  provideExperimentalZonelessChangeDetection,
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
import CityReport, { ReportType } from '../../models/cityReport';
import { MatButtonModule } from '@angular/material/button';
import { AuthUser } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [
    GoogleMapsModule,
    CommonModule,
    FormsModule,
    AutocompleteInputComponent,
    ViewNavigationComponent,
    MatButtonModule,
  ],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  @ViewChild('mapRef', { static: false }) mapElement!: ElementRef;

  zoom = 16;
  selectedAddress: WritableSignal<string | null> = signal(null); // Nullable address
  latitude: number | undefined = undefined;
  longitude: number | undefined = undefined;
  center: WritableSignal<{ lat: number; lng: number }> = signal({
    lat: 43.65883681584811,
    lng: -79.37932890768772,
  });
  user!: AuthUser | null;

  mapClickListener: google.maps.MapsEventListener | null = null;

  isMapLoaded: boolean = false;
  infoWindow!: google.maps.InfoWindow;
  map!: google.maps.Map;
  marker!: google.maps.marker.AdvancedMarkerElement | null; // Nullable marker

  reports: CityReport[] | undefined;

  constructor(
    private googleMapsService: GoogleMapsService,
    private reportService: ReportService,
    private userService: UserService,
    public dialog: MatDialog
  ) {}

  async ngOnInit() {
    await this.loadMap();

    this.user = this.userService.user!;
    await this.loadReports();

    this.user = this.userService.user!;

    const headerElement = document.createElement('div');
    headerElement.innerHTML = `<strong>Create a Report</strong>`;
    headerElement.style.fontSize = '20px';

    this.infoWindow = new google.maps.InfoWindow({
      content: '',
      ariaLabel: 'Location Info',
      headerContent: headerElement,
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

  async loadReports() {
    const results = await this.reportService.getAllActive();
    if (!results) {
      console.error('No report loaded');
      return;
    }
    this.reports = results['reports'];
    if (!this.map) {
      console.error('Map is not initialized');
      return;
    }
    if (!this.reports) {
      console.error('No report loaded');
    } else {
      for (const report of this.reports) {
        const position = { lat: report.latitude, lng: report.longitude };

        const markerContent = document.createElement('div');
        markerContent.className = 'custom-marker';

        if (report.userID === this.user?.userID) {
          markerContent.innerHTML = `
          <i class="material-icons" style="font-size: 40px; color: #00008B;">
      ${this.getIconForReportType(report.type)}
    </i>
        `;
        } else {
          markerContent.innerHTML = `
      <i class="material-icons" style="font-size: 40px; color: #ff5722;">
  ${this.getIconForReportType(report.type)}
</i>
    `;
        }

        const marker = new google.maps.marker.AdvancedMarkerElement({
          position: position,
          map: this.map,
          gmpClickable: true,
          content: markerContent,
        });

        const headerElement = document.createElement('div');
        headerElement.innerHTML = `<strong>${report.name}</strong>`;
        headerElement.style.fontSize = '20px';

        // Create an info window for the marker
        const infoWindow = new google.maps.InfoWindow({
          headerContent: headerElement,
          content: `
          <div>
          <p><strong>Type:</strong> ${report.type}</p>
          <p><strong>Description:</strong> ${report.description}</p>
          <p><strong>Address:</strong> ${report.location}</p>
          <p><strong>Status:</strong> ${report.status}</p>
          <p><strong>Submitted At:</strong> ${report.submittedAt}</p>
        </div>
      `,
        });
        marker.addListener('gmp-click', () => {
          infoWindow.open(this.map, marker);
        });
      }
    }
  }

  getIconForReportType(type: ReportType): string {
    switch (type) {
      case ReportType.INFRUSTRUCTURE:
        return 'construction';
      case ReportType.TRAFFIC_AND_TRANSPORTATION:
        return 'directions_car';
      case ReportType.PUBLIC_UTILITIES_AND_SERVICES:
        return 'electrical_services';
      case ReportType.PUBLIC_SAFETY:
        return 'security';
      case ReportType.ANIMAL_AND_WILDLIFE:
        return 'pets';
      case ReportType.PUBLIC_SPACES_AND_PARKS:
        return 'park';
      case ReportType.WASTE_MANAGEMENT:
        return 'recycling';
      case ReportType.WEATHER_AND_NATURAL_DISASTERS:
        return 'thunderstorm';
      default:
        return 'report_problem'; // Default Material icon
    }
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

    if (location) {
      this.longitude = location.lng();
      this.latitude = location.lat();
      const newLatLng = { lat: location.lat(), lng: location.lng() };

      this.center.set(newLatLng);
      this.map.setCenter(newLatLng);

      if (formattedAddress) {
        this.addMarker(newLatLng);
      }
    }
  }

  addMarker(position: { lat: number; lng: number }) {
    if (this.marker) {
      this.marker.map = null;
      this.marker = null;
    }

    this.marker = new google.maps.marker.AdvancedMarkerElement({
      position: position,
      map: this.map,
      gmpClickable: true,
    });

    const infoContent = document.createElement('div');
    infoContent.innerHTML = `<p><strong>Location: </strong>${this.selectedAddress()}</p><button id="createReportBtn">Create a report</button>`;

    this.infoWindow.setContent(infoContent);
    this.infoWindow.open(this.map, this.marker);

    setTimeout(() => {
      const buttonElement = document.getElementById('createReportBtn');
      if (buttonElement) {
        buttonElement.addEventListener('click', () => {
          this.openCreateReportModal();
        });
      }
    }, 100);

    this.marker.addListener('gmp-click', () => {
      this.infoWindow.open(this.map, this.marker);
    });
  }

  activateMapClickListener() {
    if (!this.map) {
      console.error('Map is not initialized');
      return;
    }

    this.mapClickListener = this.map.addListener(
      'click',
      async (event: google.maps.MapMouseEvent) => {
        if (!event.latLng) return;

        this.longitude = event.latLng.lng();
        this.latitude = event.latLng.lat();

        const clickedPosition = {
          lat: event.latLng.lat(),
          lng: event.latLng.lng(),
        };

        this.selectedAddress.set(
          await this.getAddressFromCoordinates(clickedPosition)
        );
        this.addMarker(clickedPosition);
      }
    );
  }

  disactivateMapClickListener() {
    if (this.mapClickListener) {
      google.maps.event.removeListener(this.mapClickListener);
      this.mapClickListener = null;
    } else {
      console.warn('No active map click listener to deactivate');
    }
  }

  async getAddressFromCoordinates(position: {
    lat: number;
    lng: number;
  }): Promise<string> {
    return new Promise((resolve, reject) => {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ location: position }, (results, status) => {
        if (status === 'OK' && results && results[0]) {
          resolve(results[0].formatted_address);
        } else {
          console.error('Geocoder failed due to:', status);
          resolve('Address not found');
        }
      });
    });
  }

  openCreateReportModal(): void {
    const dialogRef = this.dialog.open(CreateReportModalComponent, {
      width: '400px', // Set width if needed
      data: {
        location: this.selectedAddress(),
        latitude: this.latitude,
        longitude: this.longitude,
      },
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        await this.reportService.create(result);
        this.reports?.push(result);
        const position = { lat: result.latitude, lng: result.longitude };

        const markerContent = document.createElement('div');
        markerContent.className = 'custom-marker';

        if (result.userID === this.user?.userID) {
          markerContent.innerHTML = `
          <i class="material-icons" style="font-size: 40px; color: #00008B;">
      ${this.getIconForReportType(result.type)}
    </i>
        `;
        } else {
          markerContent.innerHTML = `
      <i class="material-icons" style="font-size: 40px; color: #ff5722;">
  ${this.getIconForReportType(result.type)}
</i>
    `;
        }

        const marker = new google.maps.marker.AdvancedMarkerElement({
          position: position,
          map: this.map,
          gmpClickable: true,
          content: markerContent,
        });

        const headerElement = document.createElement('div');
        headerElement.innerHTML = `<strong>${result.name}</strong>`;
        headerElement.style.fontSize = '20px';

        // Create an info window for the marker
        const infoWindow = new google.maps.InfoWindow({
          headerContent: headerElement,
          content: `
          <div>
          <p><strong>Type:</strong> ${result.type}</p>
          <p><strong>Description:</strong> ${result.description}</p>
          <p><strong>Address:</strong> ${result.location}</p>
          <p><strong>Status:</strong> ${result.status}</p>
          <p><strong>Submitted At:</strong> ${result.submittedAt}</p>
        </div>
      `,
        });
        marker.addListener('gmp-click', () => {
          infoWindow.open(this.map, marker);
        });
        if (this.marker) {
          this.marker.map = null; // Remove the marker from the map
          this.marker = null; // Clear the marker reference
        }
        if (this.mapClickListener) {
          this.disactivateMapClickListener();
        }
      }
    });
  }
}
