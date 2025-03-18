import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MapComponent } from './components/map/map.component';
import { RegisterComponent } from './components/register/register.component';
import { ErrorComponent } from './components/error/error.component';

const routeConfig: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'map', component: MapComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'error', component: ErrorComponent },
];
export default routeConfig;
