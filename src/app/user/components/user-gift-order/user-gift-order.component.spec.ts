import { configureTestSuite } from './../../../shared/utils/configureTestSuite';
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGiftOrderComponent } from './user-gift-order.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('UserGiftOrderComponent', () => {
  configureTestSuite();
  let component: UserGiftOrderComponent;
  let fixture: ComponentFixture<UserGiftOrderComponent>;

  beforeAll((done) => (async () => {
    TestBed.configureTestingModule({
      declarations: [UserGiftOrderComponent],
      schemas: [NO_ERRORS_SCHEMA]
    });
    await TestBed.compileComponents();
  })().then(done).catch(done.fail));

  beforeEach(fakeAsync(() => {
    fixture = TestBed.createComponent(UserGiftOrderComponent);
    component = fixture.componentInstance;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserGiftOrderComponent);
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
