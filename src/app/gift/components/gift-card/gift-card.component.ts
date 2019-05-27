import { FirebaseService } from './../../../shared/services/firebase.service';
import { HistoryModel } from './../../../shared/model/history.model';
import { GiftModel } from './../../../shared/model/gift.model';
import { Component, OnInit, Input } from '@angular/core';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-gift-card',
  templateUrl: './gift-card.component.html',
  styleUrls: ['./gift-card.component.css'],
})
export class GiftCardComponent implements OnInit {
  @Input() public gift: any;
  constructor(
    private router: Router,
    config: NgbRatingConfig,
    private currentPath: ActivatedRoute,
    private firebaseService: FirebaseService,
  ) {
    config.max = 5;
    config.readonly = true;
  }

  ngOnInit() {}

  public routingToOrder(key: string): void {
    this.router.navigate(['/user/order'], { relativeTo: this.currentPath, queryParams: { giftKey: key } });
  }

  /**
   * @param giftHistory : the complete data of gift history
   */
  public reedemedCode(giftHistory: any) {
    giftHistory.reedemed = true;
    this.firebaseService.updateGiftHistory(giftHistory.key, giftHistory);
  }
}
