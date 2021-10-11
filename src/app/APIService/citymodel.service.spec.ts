import { TestBed } from '@angular/core/testing';

import { CitymodelService } from './citymodel.service';

describe('CitymodelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CitymodelService = TestBed.get(CitymodelService);
    expect(service).toBeTruthy();
  });
});
