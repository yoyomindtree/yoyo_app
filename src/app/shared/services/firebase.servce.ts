import { Injectable } from '@angular/core';

// Firebase Imports
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
// Model Imports
import { UserModel } from '../model/user.model';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  // creates the db path for the user list
  private dbUsers = '/User-List';
  // creates teh usersRefernce for the
  public usersRef: AngularFireList<UserModel> = null;
  constructor(private db: AngularFireDatabase) {
    this.usersRef = db.list(this.dbUsers);
  }
  /**
   *
   * @param user : userParam
   * this method creates the user
   */
  public createUser(user: UserModel): void {
    this.usersRef.push(user);
  }
}
