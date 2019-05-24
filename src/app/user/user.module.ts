import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GiftModule } from './../gift/gift.module';
import { UserRoutingModule, userComponents } from './user-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserGiftOrderComponent } from './components/user-gift-order/user-gift-order.component';
import { AngularMaterialModule } from '../angular-material.module';
import { UserSearchComponent } from './components/user-search/user-search.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [userComponents, UserGiftOrderComponent, UserSearchComponent],
  imports: [
    CommonModule,
    GiftModule,
    UserRoutingModule,
    NgbModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class UserModule {}
