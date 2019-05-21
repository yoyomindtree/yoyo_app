import { Injectable } from '@angular/core';
import { GiftModel } from 'src/app/shared/model/gift.model';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root',
})
export class AdminFireService {
  private dbGifts = '/Gift-List';
  // creates the reference for the gift list
  private giftRef: AngularFireList<GiftModel> = null;
  constructor(private db: AngularFireDatabase) {
    this.giftRef = db.list(this.dbGifts);
  }
  /**
   *
   * @param gift - Type GiftModel
   *  adds the gift to firebase
   */
  public addGift(gift: GiftModel) {
    this.giftRef.push(gift);
  }
}
