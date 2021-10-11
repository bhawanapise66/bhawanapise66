import { TestBed } from '@angular/core/testing';

import { DistrictmodelService } from './districtmodel.service';

describe('DistrictmodelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DistrictmodelService = TestBed.get(DistrictmodelService);
    expect(service).toBeTruthy();
  });
});
