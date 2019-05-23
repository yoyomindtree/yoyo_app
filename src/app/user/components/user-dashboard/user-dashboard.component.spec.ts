import { FirebaseService } from 'src/app/shared/services/firebase.service';
import { MockService } from './../../../shared/services/mock.service.spec';
import { configureTestSuite } from './../../../shared/utils/configureTestSuite';
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDashboardComponent } from './user-dashboard.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('UserDashboardComponent', () => {
  configureTestSuite();
  let component: UserDashboardComponent;
  let fixture: ComponentFixture<UserDashboardComponent>;

  beforeAll((done) => (async () => {
    TestBed.configureTestingModule({
      declarations: [UserDashboardComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: FirebaseService, useClass: MockService }
      ]
    });
    await TestBed.compileComponents();
  })().then(done).catch(done.fail));

  beforeEach(fakeAsync(() => {
    fixture = TestBed.createComponent(UserDashboardComponent);
    component = fixture.componentInstance;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterAll(() => {
    component = null;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
