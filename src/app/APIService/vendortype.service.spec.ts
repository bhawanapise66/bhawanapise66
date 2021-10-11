import { TestBed } from '@angular/core/testing';

import { VendortypeService } from './vendortype.service';

describe('VendortypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VendortypeService = TestBed.get(VendortypeService);
    expect(service).toBeTruthy();
  });
});
