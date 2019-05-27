import { Observable, of } from 'rxjs';
import { AngularFireList } from '@angular/fire/database';

export class MockService {
  public LoginInWithGoogle(): string {
    return '';
  }
  public group({}): any {
    return {
      get: () => {
        return {
          value: 'string',
        };
      },
    };
  }
  // mock method for add gift.
  public addGift(value: any): void {}
  public getAllGifts(): any {
    return {
      snapshotChanges: () => {
        return {
          pipe: () => of(null),
        };
      },
    };
  }
  // mock service for getting single user.
  public getSingleUser(email: string): Observable<any> {
    return new Observable(null);
  }

  public getUserList(): any {
    return {
      snapshotChanges: () => {
        return {
          pipe: () => of(null),
        };
      },
    };
  }

  public list(value: string): any {
    return '';
  }
  public dispatch(value: any): any {
    return new Observable(null);
  }
}

const authState = {
  displayName: null,
  isAnonymous: true,
  uid: '17WvU2Vj58SnTz8v7EqyYYb0WRc2',
};
export const mockAngularFireAuth: any = {
  auth: jasmine.createSpyObj('auth', {
    signInAnonymously: Promise.reject({
      code: 'auth/operation-not-allowed',
    }),
  }),
  authState: of(authState),
};
