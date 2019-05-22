import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from './../angular-material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { adminComponents, AdminRoutingModule } from './admin-routing.module';
import { GiftModule } from '../gift/gift.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminAddgiftpopupComponent } from './components/admin-addgiftpopup/admin-addgiftpopup.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [adminComponents, AdminAddgiftpopupComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    GiftModule,
    NgbModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  entryComponents: [AdminAddgiftpopupComponent],
})
export class AdminModule {}
