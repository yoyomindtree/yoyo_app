import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserHistoryComponent } from './user-history/user-history.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';

@NgModule({
  declarations: [UserHistoryComponent, UserProfileComponent, UserDashboardComponent],
  imports: [
    CommonModule
  ]
})
export class UserModule { }
