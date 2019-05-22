import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gift-review',
  templateUrl: './gift-review.component.html',
  styleUrls: ['./gift-review.component.css']
})
export class GiftReviewComponent implements OnInit {
  public rating = 2;
  constructor(config: NgbRatingConfig) {
    config.max = 5;
    config.readonly = true;
  }

  ngOnInit() {
  }

}
