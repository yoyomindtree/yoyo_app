import { GiftModel } from 'src/app/shared/model/gift.model';
import { GiftResolverService } from './../../../shared/services/gift-resolver.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-user-gift-order',
  templateUrl: './user-gift-order.component.html',
  styleUrls: ['./user-gift-order.component.css']
})
export class UserGiftOrderComponent implements OnInit {
  public giftDetail: GiftModel;

  constructor(private activatedRoute: ActivatedRoute) {
    this.activatedRoute.data.pipe(map((data: any) => data.gift[0])).subscribe((res) => {
      this.giftDetail = res;
    });
  }

  ngOnInit() {
  }

}
