import { TestBed } from '@angular/core/testing';

import { DevicemasterService } from './devicemaster.service';

describe('DevicemasterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DevicemasterService = TestBed.get(DevicemasterService);
    expect(service).toBeTruthy();
  });
});
