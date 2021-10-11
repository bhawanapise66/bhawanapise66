import { TestBed } from '@angular/core/testing';

import { VehicleclassService } from './vehicleclass.service';

describe('VehicleclassService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VehicleclassService = TestBed.get(VehicleclassService);
    expect(service).toBeTruthy();
  });
});
