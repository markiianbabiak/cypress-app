import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MapComponent } from './components/map/map.component';
import { RegisterComponent } from './components/register/register.component';
import { ErrorComponent } from './components/error/error.component';
import { authGuard } from './guards/auth.guard';
import { ReportsComponent } from './components/reports/reports.component';

const routeConfig: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'map', component: MapComponent, canActivate: [authGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'reports', component: ReportsComponent, canActivate: [authGuard] },
  { path: 'error', component: ErrorComponent },
  { path: '**', redirectTo: 'error' },
];
export default routeConfig;
