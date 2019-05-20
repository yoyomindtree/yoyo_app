import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserHistoryComponent } from './user-history/user-history.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
  { path: '', component: UserDashboardComponent },
  {
    path: 'history',
    component: UserHistoryComponent,
  },
  { path: 'profile', component: UserProfileComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
export const userComponents = [UserDashboardComponent, UserHistoryComponent, UserProfileComponent];
