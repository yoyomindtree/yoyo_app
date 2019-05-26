import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, Input } from '@angular/core';
import { ReviewModel } from 'src/app/shared/model/review.model';

@Component({
  selector: 'app-gift-review',
  templateUrl: './gift-review.component.html',
  styleUrls: ['./gift-review.component.css'],
})
export class GiftReviewComponent implements OnInit {
  // input property for data binding.
  @Input() review: ReviewModel;

  public rating = 2;

  constructor(config: NgbRatingConfig) {
    config.max = 5;
    config.readonly = true;
  }

  ngOnInit() {}
}
