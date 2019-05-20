import { UserRoutingModule, userComponents } from './user-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [userComponents],
  imports: [CommonModule, UserRoutingModule],
})
export class UserModule {}
