import { GiftModel } from '../model/gift.model';
import { Injectable } from '@angular/core';

// Firebase Imports
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
// Model Imports
import { UserModel } from '../model/user.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ReviewModel } from '../model/review.model';
import { HistoryModel } from '../model/history.model';

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

  // creates the db path for the reviewmodel.
  private dbGiftReviews = '/Gift-Reviews';
  // creates the refernce for the giftReview list
  private giftReviewRef: AngularFireList<ReviewModel> = null;

  // creates the db path for the history.
  private dbGiftHistory = '/Gift-History';
  // creates the reference for the gift history.
  private giftHistoryRef: AngularFireList<HistoryModel> = null;

  constructor(private db: AngularFireDatabase) {
    this.usersRef = db.list(this.dbUsers);
    this.giftRef = db.list(this.dbGifts);
    this.giftReviewRef = db.list(this.dbGiftReviews);
    this.giftHistoryRef = db.list(this.dbGiftHistory);
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
    return this.db
      .list('/User-List', (ref) => ref.orderByChild('userName').equalTo(email))
      .snapshotChanges()
      .pipe(map((changes) => changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))));
  }
  /**
   *
   * @param giftName
   * method to  get the serach results
   */
  public getGiftSearchResult(): Observable<any> {
    return this.db.list(this.dbGifts).valueChanges();
  }
  /**
   * method to add gift review
   * @param review:review input.
   */
  public addGiftReview(review: ReviewModel): void {
    this.giftReviewRef.push(review).catch((error) => console.log(error));
  }
  /**
   *  method to get the reviews of the gift.
   * @param giftId -->Id of te gift.
   */
  public getGiftReviews(giftId: string): Observable<any> {
    return this.db
      .list('/Gift-Reviews', (ref) => ref.orderByChild('giftId').equalTo(giftId))
      .snapshotChanges()
      .pipe(map((changes) => changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))));
  }
  /**
   * method to add the transaction to history table.
   * @param transaction: historyModel.
   */
  public addGiftHistory(transaction: HistoryModel): void {
    this.giftHistoryRef.push(transaction).catch((error) => console.log(error));
  }

  /**
   * @param key : gift history Record Key
   * @param value : gift history complete detail which need to update
   * this method update the gift history
   */
  public updateGiftHistory(key: any, value: any): void {
    this.giftHistoryRef.update(key, value).catch((error) => {
      console.log(error);
    });
  }

  /**
   * @param email : email id of reciever
   */
  public getHistoryForReciever(email: string): Observable<any> {
    return this.db
      .list('/Gift-History', (ref) => ref.orderByChild('reciverEmail').equalTo(email))
      .snapshotChanges()
      .pipe(map((changes) => changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))));
  }
  /**
   * method to get the history.
   */
  public getHistory(): AngularFireList<HistoryModel> {
    return this.giftHistoryRef;
  }
}
