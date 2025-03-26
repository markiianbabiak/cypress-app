import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GoogleMapsService } from '../../services/google-maps.service';

@Component({
  selector: 'app-autocomplete-input',
  imports: [CommonModule, FormsModule],
  templateUrl: './autocomplete-input.component.html',
  styleUrl: './autocomplete-input.component.css',
})
export class AutocompleteInputComponent {
  @Output() setAddress: EventEmitter<any> = new EventEmitter();
  @ViewChild('addresstext') addresstext: any;

  autocompleteInput!: string;
  queryWait!: boolean;

  constructor(private googleMapsService: GoogleMapsService) {}

  ngOnInit() {}

  async ngAfterViewInit() {
    try {
      this.getPlaceAutocomplete();
    } catch (error) {
      console.error('Error loading Google Maps script:', error);
    }
  }

  private getPlaceAutocomplete() {
    const autocomplete = new google.maps.places.Autocomplete(
      this.addresstext.nativeElement,
      {
        componentRestrictions: { country: 'CA' },
        types: ['address'], // 'establishment' / 'address' / 'geocode'
      }
    );
    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      const place = autocomplete.getPlace();
      this.invokeEvent(place);
    });
  }

  invokeEvent(place: Object) {
    this.setAddress.emit(place);
  }
}
