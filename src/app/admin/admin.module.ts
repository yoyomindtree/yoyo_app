import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { adminComponents, AdminRoutingModule } from './admin-routing.module';


@NgModule({

  declarations: [adminComponents],
  imports: [
    CommonModule,
    AdminRoutingModule
  ],

})
export class AdminModule { }

