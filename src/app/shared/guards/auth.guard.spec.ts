import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { MockService, mockAngularFireAuth } from '../services/mock.service.spec';
import { FirebaseService } from '../services/firebase.service';
import { TestBed, async, inject } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: FirebaseService, useClass: MockService },
        { provide: AngularFireAuth, useValue: mockAngularFireAuth },
        { provide: Router, useClass: MockService },
      ],
    });
  });

  it('should ...', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
