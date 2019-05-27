import { FirebaseService } from 'src/app/shared/services/firebase.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserDialogComponent } from './edit-user-dialog.component';
import { ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MockService } from '../../services/mock.service.spec';
import { LoginService } from '../../services/login.service';
import { AngularMaterialModule } from 'src/app/angular-material.module';

fdescribe('EditUserDialogComponent', () => {
  let component: EditUserDialogComponent;
  let fixture: ComponentFixture<EditUserDialogComponent>;
  let form: FormBuilder;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule, AngularMaterialModule],
      declarations: [EditUserDialogComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: MatDialogRef, useClass: MockService },
        { provide: MAT_DIALOG_DATA, useClass: MockService },
        { provide: FirebaseService, useClass: MockService },
        { provide: LoginService, useClass: MockService },
        { provide: FormBuilder },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUserDialogComponent);
    component = fixture.componentInstance;
    form = new FormBuilder();
    component.getCurrentUserEmail = 'dummy@gmail.com';
    component.editDetailsForm = form.group([]);
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
