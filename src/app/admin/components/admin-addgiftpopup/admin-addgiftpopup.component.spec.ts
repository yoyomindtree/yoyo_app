import { configureTestSuite } from './../../../shared/utils/configureTestSuite';
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddgiftpopupComponent } from './admin-addgiftpopup.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AdminAddgiftpopupComponent', () => {
  configureTestSuite();
  let component: AdminAddgiftpopupComponent;
  let fixture: ComponentFixture<AdminAddgiftpopupComponent>;

  beforeAll((done) => (async () => {
    TestBed.configureTestingModule({
      declarations: [AdminAddgiftpopupComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ]
    });
    await TestBed.compileComponents();
  })().then(done).catch(done.fail));

  beforeEach(fakeAsync(() => {
    fixture = TestBed.createComponent(AdminAddgiftpopupComponent);
    component = fixture.componentInstance;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddgiftpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
