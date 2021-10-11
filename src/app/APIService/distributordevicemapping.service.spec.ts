import { TestBed } from '@angular/core/testing';

import { DistributordevicemappingService } from './distributordevicemapping.service';

describe('DistributordevicemappingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DistributordevicemappingService = TestBed.get(DistributordevicemappingService);
    expect(service).toBeTruthy();
  });
});
