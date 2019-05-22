import { UserGiftOrderComponent } from './components/user-gift-order/user-gift-order.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { UserHistoryComponent } from './components/user-history/user-history.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

const routes: Routes = [
  { path: '', component: UserDashboardComponent },
  {
    path: 'history',
    component: UserHistoryComponent,
  },
  {
    path: 'order',
    component: UserGiftOrderComponent,
  },
  { path: 'profile', component: UserProfileComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
export const userComponents = [UserDashboardComponent, UserHistoryComponent, UserProfileComponent];
