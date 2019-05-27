import { FirebaseService } from './../../../shared/services/firebase.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { MockService } from './../../../shared/services/mock.service.spec';
import { configureTestSuite } from './../../../shared/utils/configureTestSuite';
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AdminUserListComponent } from './admin-user-list.component';
import { MatTableModule } from '@angular/material';
import { AdminFireService } from '../../services/admin-fire.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
describe('AdminUserListComponent', () => {
  configureTestSuite();
  let component: AdminUserListComponent;
  let fixture: ComponentFixture<AdminUserListComponent>;

  beforeAll((done) =>
    (async () => {
      TestBed.configureTestingModule({
        declarations: [AdminUserListComponent],
        schemas: [NO_ERRORS_SCHEMA],
        providers: [
          { provide: AngularFireDatabase, useClass: MockService },
          { provide: AdminFireService, useClass: MockService },
        ],
        imports: [MatTableModule, BrowserAnimationsModule],
      });
      await TestBed.compileComponents();
    })()
      .then(done)
      .catch(done.fail),
  );

  beforeEach(fakeAsync(() => {
    fixture = TestBed.createComponent(AdminUserListComponent);
    component = fixture.componentInstance;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterAll(() => {
    component = null;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
