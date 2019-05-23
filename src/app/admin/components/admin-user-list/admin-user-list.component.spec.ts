import { configureTestSuite } from './../../../shared/utils/configureTestSuite';
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AdminUserListComponent } from './admin-user-list.component';

describe('AdminUserListComponent', () => {
  configureTestSuite();
  let component: AdminUserListComponent;
  let fixture: ComponentFixture<AdminUserListComponent>;

  beforeAll((done) => (async () => {
    TestBed.configureTestingModule({
      declarations: [AdminUserListComponent],
      schemas: [NO_ERRORS_SCHEMA]
    });
    await TestBed.compileComponents();
  })().then(done).catch(done.fail));

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
