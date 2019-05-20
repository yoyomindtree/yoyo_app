import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { adminComponents, AdminRoutingModule } from './admin-routing.module';
import { GiftModule } from '../gift/gift.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  declarations: [adminComponents],
  imports: [CommonModule, AdminRoutingModule, GiftModule, NgbModule],
})
export class AdminModule {}
