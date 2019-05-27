import { FirebaseService } from 'src/app/shared/services/firebase.service';
import { MockService } from './../../../shared/services/mock.service.spec';
import { configureTestSuite } from './../../../shared/utils/configureTestSuite';
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDashboardComponent } from './user-dashboard.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { selectGiftList } from 'src/app/shared/store/selectors/gift.selector';

describe('UserDashboardComponent', () => {
  configureTestSuite();
  let component: UserDashboardComponent;
  let fixture: ComponentFixture<UserDashboardComponent>;
  class StoreMock {
    // How we did it before
    select = jasmine.createSpy().and.returnValue(of(selectGiftList));
    dispatch = jasmine.createSpy();
  }

  beforeAll((done) =>
    (async () => {
      TestBed.configureTestingModule({
        declarations: [UserDashboardComponent],
        schemas: [NO_ERRORS_SCHEMA],
        providers: [{ provide: FirebaseService, useClass: MockService }, { provide: Store, useClass: StoreMock }],
      });
      await TestBed.compileComponents();
    })()
      .then(done)
      .catch(done.fail),
  );

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
