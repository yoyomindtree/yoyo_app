import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { adminComponents, AdminRoutingModule } from './admin-routing.module';
import { GiftModule } from '../gift/gift.module';

@NgModule({
  declarations: [adminComponents],
  imports: [CommonModule, AdminRoutingModule, GiftModule],
})
export class AdminModule {}
