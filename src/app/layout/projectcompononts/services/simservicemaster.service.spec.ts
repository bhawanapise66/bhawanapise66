import { TestBed } from '@angular/core/testing';

import { SimservicemasterService } from './simservicemaster.service';

describe('SimservicemasterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SimservicemasterService = TestBed.get(SimservicemasterService);
    expect(service).toBeTruthy();
  });
});
