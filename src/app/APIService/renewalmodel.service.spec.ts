import { TestBed } from '@angular/core/testing';

import { RenewalmodelService } from './renewalmodel.service';

describe('RenewalmodelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RenewalmodelService = TestBed.get(RenewalmodelService);
    expect(service).toBeTruthy();
  });
});
