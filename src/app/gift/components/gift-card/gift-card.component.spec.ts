import { MockService } from './../../../shared/services/mock.service.spec';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { configureTestSuite } from '../../../shared/utils/configureTestSuite';
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftCardComponent } from './gift-card.component';
import { Router, ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModule, NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { FirebaseService } from 'src/app/shared/services/firebase.service';
describe('GiftCardComponent', () => {
  configureTestSuite();
  let component: GiftCardComponent;
  let fixture: ComponentFixture<GiftCardComponent>;
  let router: Router;
  let config: NgbRatingConfig;
  let currentPath: ActivatedRoute;
  beforeAll((done) =>
    (async () => {
      TestBed.configureTestingModule({
        declarations: [GiftCardComponent],
        schemas: [NO_ERRORS_SCHEMA],
        imports: [RouterTestingModule, NgbModule],
        providers: [{ provide: FirebaseService, useClass: MockService }],
      });
      await TestBed.compileComponents();
    })()
      .then(done)
      .catch(done.fail),
  );

  beforeEach(fakeAsync(() => {
    fixture = TestBed.createComponent(GiftCardComponent);
    component = fixture.componentInstance;
    router = TestBed.get(Router);
    config = TestBed.get(NgbRatingConfig);
    currentPath = TestBed.get(ActivatedRoute);
  }));

  afterAll(() => {
    component = null;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
