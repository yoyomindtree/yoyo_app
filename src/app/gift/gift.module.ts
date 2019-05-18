import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GiftCardComponent } from './gift-card/gift-card.component';
import { GiftDescriptionComponent } from './gift-description/gift-description.component';
import { GiftReviewComponent } from './gift-review/gift-review.component';

@NgModule({
  declarations: [GiftCardComponent, GiftDescriptionComponent, GiftReviewComponent],
  imports: [
    CommonModule
  ]
})
export class GiftModule { }
