import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GiftModule } from './../gift/gift.module';
import { UserRoutingModule, userComponents } from './user-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [userComponents],
  imports: [CommonModule, GiftModule, UserRoutingModule, NgbModule],
})
export class UserModule {}
