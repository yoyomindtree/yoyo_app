import { LoginComponent } from './shared/components/login/login.component';
import { Routes } from '@angular/router';

export const ROUTES: Routes = [
  { path: ' ', component: LoginComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
];
