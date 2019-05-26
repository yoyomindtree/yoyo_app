import { AdminFireService } from './../../services/admin-fire.service';
import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MockService } from './../../../shared/services/mock.service.spec';
import { configureTestSuite } from './../../../shared/utils/configureTestSuite';
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddgiftpopupComponent } from './admin-addgiftpopup.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

fdescribe('AdminAddgiftpopupComponent', () => {
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
          { provide: FormBuilder, useClass: MockService },
          { provide: AdminFireService, useClass: MockService },
        ],
      });
      await TestBed.compileComponents();
    })()
      .then(done)
      .catch(done.fail),
  );

  beforeEach(fakeAsync(() => {
    fixture = TestBed.createComponent(AdminAddgiftpopupComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddgiftpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
