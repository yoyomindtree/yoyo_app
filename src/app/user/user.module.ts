import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { routingComponents } from './user-routing.module';

@NgModule({
  declarations: [routingComponents],
  imports: [
    CommonModule
  ]
})
export class UserModule { }
