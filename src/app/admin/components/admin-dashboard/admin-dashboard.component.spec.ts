import { MockService } from './../../../shared/services/mock.service.spec';
import { MatDialog } from '@angular/material';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { configureTestSuite } from './../../../shared/utils/configureTestSuite';
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDashboardComponent } from './admin-dashboard.component';

describe('AdminDashboardComponent', () => {
  configureTestSuite();
  let component: AdminDashboardComponent;
  let fixture: ComponentFixture<AdminDashboardComponent>;

  beforeAll((done) =>
    (async () => {
      TestBed.configureTestingModule({
        declarations: [AdminDashboardComponent],
        schemas: [NO_ERRORS_SCHEMA],
        providers: [{ provide: MatDialog, useClass: MockService }],
      });
      await TestBed.compileComponents();
    })()
      .then(done)
      .catch(done.fail),
  );

  beforeEach(fakeAsync(() => {
    fixture = TestBed.createComponent(AdminDashboardComponent);
    component = fixture.componentInstance;
  }));

  afterAll(() => {
    component = null;
  });
  // test for component creation
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
