import { LoginService } from './../../services/login.service';
import { FirebaseService } from 'src/app/shared/services/firebase.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { configureTestSuite } from './../../utils/configureTestSuite';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MockService } from '../../services/mock.service.spec';

describe('HeaderComponent', () => {
  configureTestSuite();
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  beforeAll((done) => (async () => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {provide: AngularFireDatabase, useClass: MockService},
        {provide: FirebaseService, useClass: MockService},
        {provide: LoginService, useClass: MockService}
      ]
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
