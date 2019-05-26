import { GiftResolverService } from './../shared/services/gift-resolver.service';
import { UserGiftOrderComponent } from './components/user-gift-order/user-gift-order.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { UserHistoryComponent } from './components/user-history/user-history.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AuthGuard } from '../shared/guards/auth.guard';

const routes: Routes = [
  { path: '', component: UserDashboardComponent },
  {
    path: 'history',
    component: UserHistoryComponent,
  },
  {
    path: 'order',
    component: UserGiftOrderComponent,
    resolve: {
      gift: GiftResolverService,
    },
  },
  {
    path: 'history',
    component: UserHistoryComponent,
  },
  { path: 'profile', component: UserProfileComponent },
  {
    path: '**',
    component: UserDashboardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
export const userComponents = [UserDashboardComponent, UserHistoryComponent, UserProfileComponent];
