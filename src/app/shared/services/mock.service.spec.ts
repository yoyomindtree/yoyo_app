import { Observable, of } from 'rxjs';

export class MockService {
  public LoginInWithGoogle(): string {
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
