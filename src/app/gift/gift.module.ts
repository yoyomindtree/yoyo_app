import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GiftCardComponent } from './gift-card/gift-card.component';
import { GiftDescriptionComponent } from './gift-description/gift-description.component';
import { GiftReviewComponent } from './gift-review/gift-review.component';
import { AngularMaterialModule } from '../angular-material.module';

@NgModule({
  declarations: [GiftCardComponent, GiftDescriptionComponent, GiftReviewComponent],
  imports: [CommonModule, AngularMaterialModule],
  exports: [GiftCardComponent],
})
export class GiftModule {}
