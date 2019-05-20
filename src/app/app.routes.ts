import { AuthGuard } from './shared/guards/auth.guard';
import { LoginComponent } from './shared/components/login/login.component';
import { Routes, RouterModule } from '@angular/router';
import { FooterComponent } from './shared/components/footer/footer.component';
import { ModuleWithProviders } from '@angular/core';

export const ROUTES: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'user', loadChildren: './user/user.module#UserModule' },
  { path: 'admin', loadChildren: './admin/admin.module#AdminModule' },
];

export const APP_ROUTING: ModuleWithProviders = RouterModule.forRoot(ROUTES);
