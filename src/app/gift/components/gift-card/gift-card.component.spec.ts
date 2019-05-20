import { NO_ERRORS_SCHEMA } from '@angular/core';
import { configureTestSuite } from '../../../shared/utils/configureTestSuite';
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftCardComponent } from './gift-card.component';

describe('GiftCardComponent', () => {
  configureTestSuite();
  let component: GiftCardComponent;
  let fixture: ComponentFixture<GiftCardComponent>;

  beforeAll((done) => (async () => {
    TestBed.configureTestingModule({
      declarations: [GiftCardComponent],
      schemas: [NO_ERRORS_SCHEMA]
    });
    await TestBed.compileComponents();
  })().then(done).catch(done.fail));

  beforeEach(fakeAsync(() => {
    fixture = TestBed.createComponent(GiftCardComponent);
    component = fixture.componentInstance;
  }));

  afterAll(() => {
    component = null;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
