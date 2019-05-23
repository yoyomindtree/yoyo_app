import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminGiftListComponent } from './components/admin-gift-list/admin-gift-list.component';
import { AdminUserListComponent } from './components/admin-user-list/admin-user-list.component';

const routes: Routes = [
  {
    path: '',
    component: AdminDashboardComponent,
    children: [
      { path: '', component: AdminGiftListComponent, pathMatch: 'full' },
      { path: 'gift-list', component: AdminGiftListComponent },
      { path: 'user-list', component: AdminUserListComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
export const adminComponents = [AdminDashboardComponent, AdminGiftListComponent, AdminUserListComponent];
