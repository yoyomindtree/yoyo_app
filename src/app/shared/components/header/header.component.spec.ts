import { configureTestSuite } from './../../utils/configureTestSuite';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('HeaderComponent', () => {
  configureTestSuite();
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  beforeAll((done) => (async () => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: []
    });
    await TestBed.compileComponents();
  })().then(done).catch(done.fail));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
  });

  afterAll(() => {
    component = null;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
