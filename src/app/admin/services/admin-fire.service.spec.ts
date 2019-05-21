import { TestBed } from '@angular/core/testing';

import { AdminFireService } from './admin-fire.service';

describe('AdminFireService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminFireService = TestBed.get(AdminFireService);
    expect(service).toBeTruthy();
  });
});
