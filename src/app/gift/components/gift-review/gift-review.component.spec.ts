import { configureTestSuite } from './../../../shared/utils/configureTestSuite';
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftReviewComponent } from './gift-review.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReviewModel } from 'src/app/shared/model/review.model';

describe('GiftReviewComponent', () => {
  configureTestSuite();
  let component: GiftReviewComponent;
  let fixture: ComponentFixture<GiftReviewComponent>;
  beforeAll((done) =>
    (async () => {
      TestBed.configureTestingModule({
        declarations: [GiftReviewComponent],
        schemas: [NO_ERRORS_SCHEMA],
      });
      await TestBed.compileComponents();
    })()
      .then(done)
      .catch(done.fail),
  );

  beforeEach(fakeAsync(() => {
    fixture = TestBed.createComponent(GiftReviewComponent);
    component = fixture.componentInstance;
  }));

  beforeEach(() => {
    // fixture = TestBed.createComponent(GiftReviewComponent);
    component = fixture.componentInstance;
    component.review = new ReviewModel('123', 'Raghav', 'Awasome', 5, new Date().toString(), 'Raghav');
    fixture.detectChanges();
  });

  afterAll(() => {
    component = null;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
