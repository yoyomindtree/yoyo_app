import { Injectable } from '@angular/core';
import { GiftModel } from 'src/app/shared/model/gift.model';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { UserModel } from 'src/app/shared/model/user.model';

@Injectable({
  providedIn: 'root',
})
export class AdminFireService {
  // creates the db path for the user's
  private dbUsers = '/User-List';
  // creates the usersRefernce for the
  public usersRef: AngularFireList<UserModel> = null;
  // creates the db path for gift's
  private dbGifts = '/Gift-List';
  // creates the reference for the gift list
  private giftRef: AngularFireList<GiftModel> = null;
  constructor(private db: AngularFireDatabase) {
    this.usersRef = db.list(this.dbUsers);
    this.giftRef = db.list(this.dbGifts);
  }
  /**
   *
   * @param gift - Type GiftModel
   *  adds the gift to firebase
   */
  public addGift(gift: GiftModel): void {
    this.giftRef.push(gift);
  }
  /**
   * update the gift
   */
  public updateGift(key: string, value: any) {
    this.giftRef.update(key, value).catch((error) => console.log(error));
  }
  /**
   *
   * @param key -->key of the user in firebase
   * @param value --> new value
   * method to update the the user
   */
  public updateUser(key: string, value: any) {
    this.usersRef.update(key, value).catch((error) => console.log(error));
  }
  /**
   * method to get all the users in the db
   */
  public getUserList(): AngularFireList<UserModel> {
    return this.usersRef;
  }
}
