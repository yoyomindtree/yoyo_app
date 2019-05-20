import { configureTestSuite } from './../../utils/configureTestSuite';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  configureTestSuite();
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;
  beforeAll((done) => (async () => {
    TestBed.configureTestingModule({
      declarations: [FooterComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: []
    });
    await TestBed.compileComponents();
  })().then(done).catch(done.fail));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
  });

  afterAll(() => {
    component = null;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
