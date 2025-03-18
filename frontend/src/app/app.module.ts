import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { GoogleMapsModule } from '@angular/google-maps';
import { MapComponent } from './components/map/map.component';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    GoogleMapsModule, // Import the GoogleMapsModule
    MapComponent,
  ],
  providers: [],
  bootstrap: [],
})
export class AppModule {}
