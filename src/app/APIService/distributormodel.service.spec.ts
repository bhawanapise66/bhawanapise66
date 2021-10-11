import { TestBed } from '@angular/core/testing';

import { DistributormodelService } from './distributormodel.service';

describe('DistributormodelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DistributormodelService = TestBed.get(DistributormodelService);
    expect(service).toBeTruthy();
  });
});
