import { HttpClient } from '@angular/common/http';
import { mockAngularFireAuth, MockService } from './mock.service.spec';
import { AngularFireAuth } from '@angular/fire/auth';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

describe('LoginService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [
        LoginService,
        { provide: AngularFireAuth, useValue: mockAngularFireAuth },
        { provide: HttpClient, useValue: MockService },
        { provide: Router, useValue: MockService },
      ],
    }),
  );

  it('should be created', () => {
    const service: LoginService = TestBed.get(LoginService);
    expect(service).toBeTruthy();
  });
});
