import { AngularFireAuth } from '@angular/fire/auth';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { LoginService } from './login.service';

const authState = {
  displayName: null,
  isAnonymous: true,
  uid: '17WvU2Vj58SnTz8v7EqyYYb0WRc2',
};
const mockAngularFireAuth: any = {
  auth: jasmine.createSpyObj('auth', {
    signInAnonymously: Promise.reject({
      code: 'auth/operation-not-allowed',
    }),
  }),
  authState: of(authState),
};
describe('LoginService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [LoginService, { provide: AngularFireAuth, useValue: mockAngularFireAuth }],
    }),
  );

  it('should be created', () => {
    const service: LoginService = TestBed.get(LoginService);
    expect(service).toBeTruthy();
  });
});
