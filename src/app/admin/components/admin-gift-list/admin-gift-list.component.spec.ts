import { AngularFireDatabase } from '@angular/fire/database';
import { MockService } from './../../../shared/services/mock.service.spec';
import { AngularMaterialModule } from './../../../angular-material.module';
import { FormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGiftListComponent } from './admin-gift-list.component';

describe('AdminGiftListComponent', () => {
  let component: AdminGiftListComponent;
  let fixture: ComponentFixture<AdminGiftListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularMaterialModule,
        FormsModule
      ],
      declarations: [AdminGiftListComponent],
      providers: [
        { provide: AngularFireDatabase, useClass: MockService }
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminGiftListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
