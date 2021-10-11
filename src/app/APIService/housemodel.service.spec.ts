import { TestBed } from '@angular/core/testing';

import { HousemodelService } from './housemodel.service';

describe('HousemodelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HousemodelService = TestBed.get(HousemodelService);
    expect(service).toBeTruthy();
  });
});
