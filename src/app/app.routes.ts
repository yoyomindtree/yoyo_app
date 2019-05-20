import { AuthGuard } from './shared/guards/auth.guard';
import { LoginComponent } from './shared/components/login/login.component';
import { Routes } from '@angular/router';
import { FooterComponent } from './shared/components/footer/footer.component';

export const ROUTES: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'test', canActivate: [AuthGuard], component: FooterComponent },
];
