import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GiftModule } from './../gift/gift.module';
import { UserRoutingModule, userComponents } from './user-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserGiftOrderComponent } from './components/user-gift-order/user-gift-order.component';

@NgModule({
  declarations: [userComponents, UserGiftOrderComponent],
  imports: [CommonModule, GiftModule, UserRoutingModule, NgbModule],
})
export class UserModule {}
