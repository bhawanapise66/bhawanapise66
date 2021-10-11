import { TestBed } from '@angular/core/testing';

import { DevicemodelService } from './devicemodel.service';

describe('DevicemodelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DevicemodelService = TestBed.get(DevicemodelService);
    expect(service).toBeTruthy();
  });
});
