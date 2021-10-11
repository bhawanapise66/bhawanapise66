import { TestBed } from '@angular/core/testing';

import { PlanmasterService } from './planmaster.service';

describe('PlanmasterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlanmasterService = TestBed.get(PlanmasterService);
    expect(service).toBeTruthy();
  });
});
