import { TestBed } from '@angular/core/testing';

import { GiftResolverService } from './gift-resolver.service';

describe('GiftResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GiftResolverService = TestBed.get(GiftResolverService);
    expect(service).toBeTruthy();
  });
});
