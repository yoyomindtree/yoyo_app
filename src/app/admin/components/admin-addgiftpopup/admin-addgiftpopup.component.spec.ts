import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddgiftpopupComponent } from './admin-addgiftpopup.component';

describe('AdminAddgiftpopupComponent', () => {
  let component: AdminAddgiftpopupComponent;
  let fixture: ComponentFixture<AdminAddgiftpopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAddgiftpopupComponent ]
    })
    .compileComponents();
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
