import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GiftCardComponent } from './components/gift-card/gift-card.component';
import { GiftDescriptionComponent } from './components/gift-description/gift-description.component';
import { GiftReviewComponent } from './components/gift-review/gift-review.component';
import { AngularMaterialModule } from '../angular-material.module';

@NgModule({
  declarations: [GiftCardComponent, GiftDescriptionComponent, GiftReviewComponent],
  imports: [CommonModule, AngularMaterialModule, NgbModule],
  exports: [GiftCardComponent],
})
export class GiftModule {}
