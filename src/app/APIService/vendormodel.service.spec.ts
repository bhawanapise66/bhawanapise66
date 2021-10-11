import { TestBed } from '@angular/core/testing';

import { VendormodelService } from './vendormodel.service';

describe('VendormodelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VendormodelService = TestBed.get(VendormodelService);
    expect(service).toBeTruthy();
  });
});
