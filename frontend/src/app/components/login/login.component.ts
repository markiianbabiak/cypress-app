import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ViewNavigationComponent } from '../view-navigation/view-navigation.component';

@Component({
  selector: 'app-login',
  imports: [ViewNavigationComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {}
