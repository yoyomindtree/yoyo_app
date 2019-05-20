import { mockAngularFireAuth } from './mock.service.spec';
import { AngularFireAuth } from '@angular/fire/auth';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { LoginService } from './login.service';


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
