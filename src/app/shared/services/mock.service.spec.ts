import { Observable, of } from 'rxjs';

export class MockService {
  public LoginInWithGoogle(): string {
    return '';
  }
  public group({ }): any {
    return '';
  }
  public getAllGifts(): any {
    return {
      snapshotChanges: () => {
        return {
          pipe: () => of(null)
        };
      }
    }
  }

  public getUserList(): any {
    return {
      snapshotChanges: () => {
        return {
          pipe: () => of(null)
        };
      }
    }
  }

  public get(string: string): any {
    return {value: string};
  }

  public list({}): any {
    return '';
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
