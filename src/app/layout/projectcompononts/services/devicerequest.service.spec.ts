import { TestBed } from '@angular/core/testing';

import { DevicerequestService } from './devicerequest.service';

describe('DevicerequestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DevicerequestService = TestBed.get(DevicerequestService);
    expect(service).toBeTruthy();
  });
});
