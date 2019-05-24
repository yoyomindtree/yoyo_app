import { GiftModel } from './../../../shared/model/gift.model';
import { Component, OnInit, Input } from '@angular/core';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-gift-card',
  templateUrl: './gift-card.component.html',
  styleUrls: ['./gift-card.component.css']
})
export class GiftCardComponent implements OnInit {
  @Input() public gift: GiftModel;
  constructor(
    private router: Router,
    config: NgbRatingConfig,
    private currentPath: ActivatedRoute
  ) {
    config.max = 5;
    config.readonly = true;
  }

  ngOnInit() { }

  public routingToOrder(key: string): void {
    console.log('key:- ', key, this.currentPath);
    this.router.navigate(['/user/order'], {relativeTo: this.currentPath, queryParams: {giftKey: key} });
  }

}
