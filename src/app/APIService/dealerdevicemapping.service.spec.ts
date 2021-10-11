import { TestBed } from '@angular/core/testing';

import { DealerdevicemappingService } from './dealerdevicemapping.service';

describe('DealerdevicemappingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DealerdevicemappingService = TestBed.get(DealerdevicemappingService);
    expect(service).toBeTruthy();
  });
});
