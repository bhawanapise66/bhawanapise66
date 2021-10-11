import { TestBed } from '@angular/core/testing';

import { DevicetypeService } from './devicetype.service';

describe('DevicetypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DevicetypeService = TestBed.get(DevicetypeService);
    expect(service).toBeTruthy();
  });
});
