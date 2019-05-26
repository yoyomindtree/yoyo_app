import { GiftResolverService } from './../shared/services/gift-resolver.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GiftModule } from './../gift/gift.module';
import { UserRoutingModule, userComponents } from './user-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserGiftOrderComponent } from './components/user-gift-order/user-gift-order.component';
import { AngularMaterialModule } from '../angular-material.module';
import { UserSearchComponent } from './components/user-search/user-search.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HeaderComponent } from '../shared/components/header/header.component';

import { UserFeedbackComponent } from './components/user-feedback/user-feedback.component';
import { UserMailComponent } from './components/user-mail/user-mail.component';

@NgModule({
  declarations: [userComponents, UserGiftOrderComponent, UserSearchComponent, UserFeedbackComponent, UserMailComponent],
  imports: [
    CommonModule,
    GiftModule,
    UserRoutingModule,
    NgbModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [GiftResolverService],
  entryComponents: [UserFeedbackComponent, UserMailComponent],
})
export class UserModule {}
