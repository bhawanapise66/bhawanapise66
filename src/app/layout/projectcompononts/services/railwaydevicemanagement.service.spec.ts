import { TestBed } from '@angular/core/testing';

import { RailwaydevicemanagementService } from './railwaydevicemanagement.service';

describe('RailwaydevicemanagementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RailwaydevicemanagementService = TestBed.get(RailwaydevicemanagementService);
    expect(service).toBeTruthy();
  });
});
