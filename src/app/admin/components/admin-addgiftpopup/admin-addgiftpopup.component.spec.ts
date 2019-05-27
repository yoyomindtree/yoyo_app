import { AdminFireService } from './../../services/admin-fire.service';
import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MockService } from './../../../shared/services/mock.service.spec';
import { configureTestSuite } from './../../../shared/utils/configureTestSuite';
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddgiftpopupComponent } from './admin-addgiftpopup.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AdminAddgiftpopupComponent', () => {
  configureTestSuite();
  let component: AdminAddgiftpopupComponent;
  let fixture: ComponentFixture<AdminAddgiftpopupComponent>;

  beforeAll((done) =>
    (async () => {
      TestBed.configureTestingModule({
        imports: [ReactiveFormsModule, FormsModule],
        declarations: [AdminAddgiftpopupComponent],
        schemas: [NO_ERRORS_SCHEMA],
        providers: [
          { provide: MatDialogRef, useClass: MockService },
          { provide: MAT_DIALOG_DATA, useClass: MockService },
          { provide: AdminFireService, useClass: MockService },
        ],
      });
      await TestBed.compileComponents();
    })()
      .then(done)
      .catch(done.fail),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddgiftpopupComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });
  // it should creates an  component.
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  // form validation when it is empty.
  it('form invalid when empty', () => {
    expect(component.giftForm.valid).toBeFalsy();
  });
  // points filed validity.
  it('points field validity', () => {
    const points = component.giftForm.controls['points'];
    expect(points.valid).toBeFalsy();
  });
  // points filed should not have begetive value.
  it('points feild invalid if you provide negetive value', () => {
    component.giftForm.controls['points'].setValue(-1);
    const points = component.giftForm.controls['points'];
    expect(points.errors).toBeTruthy();
  });
  // method
  it('should show aleart after submitting the form', () => {
    // spyOn(AdminFireService, 'addGift').and.callFake(() =>)
    spyOn(window, 'alert');
    component.onSubmit();
    fixture.detectChanges();
    expect(window.alert).toHaveBeenCalledWith('Gift added Sucessfully');
  });
});
