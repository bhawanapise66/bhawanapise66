import { TestBed } from '@angular/core/testing';

import { VehicleinstallationService } from './vehicleinstallation.service';

describe('VehicleinstallationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VehicleinstallationService = TestBed.get(VehicleinstallationService);
    expect(service).toBeTruthy();
  });
});
