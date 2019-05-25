import { GiftsService } from './services/gifts.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GiftCardComponent } from './components/gift-card/gift-card.component';
import { GiftReviewComponent } from './components/gift-review/gift-review.component';
import { AngularMaterialModule } from '../angular-material.module';

@NgModule({
  declarations: [GiftCardComponent, GiftReviewComponent],
  imports: [CommonModule, AngularMaterialModule, NgbModule],
  exports: [GiftCardComponent, GiftReviewComponent],
  providers: [GiftsService]
})
export class GiftModule {}
