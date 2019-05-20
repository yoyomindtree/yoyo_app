import { GiftModel } from './../../../shared/model/gift.model';
import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/shared/services/firebase.servce';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-gift-list',
  templateUrl: './admin-gift-list.component.html',
  styleUrls: ['./admin-gift-list.component.css'],
})
export class AdminGiftListComponent implements OnInit {
  // columns of matrial table
  displayedColumns: string[] = [
    'id',
    'name',
    'rating',
    'points',
    'quantity',
    'vendor',
    'category',
    'discount',
    'image',
  ];
  // data source
  gifts;
  // filter -->Global filter
  globalFilter = '';
  // configuration for search bar
  filteredValues = {
    giftId: '',
  };
  constructor(private fireService: FirebaseService) {}
  applyFilter(filter) {
    console.log(filter);
    let filterValue = filter.trim(); // Remove whitespace
    filterValue = filter.toLowerCase();
    this.gifts.filter = filterValue;
  }
  ngOnInit() {
    this.getGifts();
  }
  /**
   * method to get the gifts
   */
  getGifts() {
    this.fireService
      .getAllGifts()
      .snapshotChanges()
      .pipe(map((changes) => changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))))
      .subscribe((data: GiftModel[]) => {
        this.gifts = data;
        this.gifts.filterPredicate = function(data, filter): boolean {
          return data.giftId.toLowerCase().includes(filter);
        };
      });
  }
  // to be removed
  AddGift() {
    const gift = new GiftModel(
      Math.floor(Math.random() * Math.floor(1000)).toString(),
      'FlipCart',
      'This is Awasome gift',
      '5',
      10,
      30,
      'Gift by yoyo',
      'food',
      5,
      100,
      '',
    );
    this.fireService.addGiftCard(gift);
  }
}
