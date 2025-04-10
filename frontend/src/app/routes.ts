import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MapComponent } from './components/map/map.component';
import { RegisterComponent } from './components/register/register.component';
import { ErrorComponent } from './components/error/error.component';
import { authGuard } from './guards/auth.guard';
import { ReportsComponent } from './components/reports/reports.component';
import { MyreportsComponent } from './components/myreports/myreports.component';
import { SettingsComponent } from './components/settings/settings.component';
import { AdminReportsComponent } from './components/admin-reports/admin-reports.component';

const routeConfig: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'map', component: MapComponent, canActivate: [authGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'reports', component: ReportsComponent, canActivate: [authGuard] },
  {
    path: 'myreports',
    component: MyreportsComponent,
    canActivate: [authGuard],
  },
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [authGuard],
  },
  {
    path: 'admin-reports',
    component: AdminReportsComponent,
    canActivate: [authGuard],
  },
  { path: 'error', component: ErrorComponent },
  { path: '**', redirectTo: 'error' },
];
export default routeConfig;
