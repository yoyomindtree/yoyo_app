import { AngularFireDatabase } from '@angular/fire/database';
import { MockService } from './../../shared/services/mock.service.spec';
import { TestBed } from '@angular/core/testing';

import { AdminFireService } from './admin-fire.service';

describe('AdminFireService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AdminFireService, 
      { provide: AngularFireDatabase, useValue: MockService }
    ],
  }));

  it('should be created', () => {
    const service: AdminFireService = TestBed.get(AdminFireService);
    expect(service).toBeTruthy();
  });
});
