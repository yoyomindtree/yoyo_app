import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminUserListComponent } from './admin-user-list/admin-user-list.component';
import { AdminGiftListComponent } from './admin-gift-list/admin-gift-list.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

@NgModule({
  declarations: [AdminUserListComponent, AdminGiftListComponent, AdminDashboardComponent],
  imports: [
    CommonModule
  ]
})
export class AdminModule { }
