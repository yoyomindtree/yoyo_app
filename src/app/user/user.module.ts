import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserHistoryComponent } from './user-history/user-history.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

@NgModule({
  declarations: [UserDashboardComponent, UserHistoryComponent, UserProfileComponent],
  imports: [CommonModule],
})
export class UserModule {}
