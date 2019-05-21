import { GiftModel } from './../../../shared/model/gift.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-gift-card',
  templateUrl: './gift-card.component.html',
  styleUrls: ['./gift-card.component.css']
})
export class GiftCardComponent implements OnInit {
  @Input() public gift: GiftModel;
  constructor() { }

  ngOnInit() {
    console.log('gift:- ', this.gift);
  }

}
