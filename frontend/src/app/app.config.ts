import { MatButtonModule } from '@angular/material/button';
import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import routeConfig from './routes';
import {
  HTTP_INTERCEPTORS,
  HttpClientModule,
  provideHttpClient,
} from '@angular/common/http';
import { APIInterceptor } from './utils/interceptor';
import { FormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { BrowserModule } from '@angular/platform-browser';
import {
  GooglePlaceModule,
  GooglePlaceDirective,
} from 'ngx-google-places-autocomplete';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routeConfig),
    provideHttpClient(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: APIInterceptor,
      multi: true,
    },
    importProvidersFrom(
      BrowserModule,
      HttpClientModule,
      FormsModule,
      GoogleMapsModule,
      MatButtonModule,
      GooglePlaceModule,
      GooglePlaceDirective
    ),
  ],
};
