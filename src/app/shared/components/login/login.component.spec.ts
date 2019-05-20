import { configureTestSuite } from './../../utils/configureTestSuite';
import { ValidationService } from './../../services/validation.service';
import { FormBuilder } from '@angular/forms';
import { MockService } from '../../services/mock.service.spec';
import { LoginService } from './../../services/login.service';
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('LoginComponent', () => {
  configureTestSuite();
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  beforeAll((done) => (async () => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: LoginService, useClass: MockService },
        { provide: FormBuilder, useClass: MockService },
        { provide: ValidationService, useClass: MockService }
      ]
    });
    await TestBed.compileComponents();
  })().then(done).catch(done.fail));

  beforeEach(fakeAsync(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  }));

  afterAll(() => {
    component = null;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
