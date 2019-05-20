import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminGiftListComponent } from './admin-gift-list/admin-gift-list.component';
import { AdminUserListComponent } from './admin-user-list/admin-user-list.component';

const routes: Routes = [
    {
        path: 'dashboard',
        component: AdminDashboardComponent
    },
    { path: 'gift-list', component: AdminGiftListComponent },
    { path: 'user-list', component: AdminUserListComponent  }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
export const routingComponents = [AdminDashboardComponent, AdminGiftListComponent, AdminUserListComponent];

