import { GiftModel } from '../model/gift.model';
import { Injectable } from '@angular/core';

// Firebase Imports
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
// Model Imports
import { UserModel } from '../model/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
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
   * @param user : userParam
   * this method creates the user
   */
  public createUser(user: UserModel): void {
    this.usersRef.push(user);
  }

  /**
   *
   * @param key : User Record Key
   * @param value : User complete detail which need to update
   * this method update the user
   */
  public updateUser(key: any, value: any): void {
    this.usersRef.update(key, value).catch((error) => {
      console.log(error);
    });
  }

  /**
   *
   * @param key : Gift Record Key
   * this method update the user
   */
  public getGiftByKey(key: string): Observable<any> {
    return this.db.list('/Gift-List', (ref) => ref.orderByKey().equalTo(key)).valueChanges();
  }
  /**
   * method to get all the users in the db
   */
  public getUserList(): AngularFireList<UserModel> {
    return this.usersRef;
  }
  /**
   * method to get all the gifts
   */
  public getAllGifts(): AngularFireList<GiftModel> {
    return this.giftRef;
  }
  /**
   *
   * @param gift ->GiftModel
   * add the gift card to the list
   */
  public addGiftCard(gift: GiftModel) {
    this.giftRef.push(gift);
  }
  /**
   * @param email -->user email id
   * gets the user based on the email id
   */
  public getSingleUser(email: string): Observable<any> {
    return this.db.list('/User-List', (ref) => ref.orderByChild('userName').equalTo(email)).valueChanges();
  }
  /**
   *
   * @param giftName
   * method to  get the serach results
   */
  public getGiftSearchResult(giftName: string): Observable<any> {
    return this.db.list(this.dbGifts).valueChanges();
  }
}
