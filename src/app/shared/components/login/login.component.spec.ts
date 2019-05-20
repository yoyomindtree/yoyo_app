import { ValidationService } from './../../services/validation.service';
import { FormBuilder } from '@angular/forms';
import { MockService } from '../../services/mock.service.spec';
import { LoginService } from './../../services/login.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { NO_ERRORS_SCHEMA } from '@angular/compiler/src/core';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: LoginService, useClass: MockService },
        { provide: FormBuilder, useClass: MockService },
        { provide: ValidationService, useClass: MockService }
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
