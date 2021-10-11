import { TestBed } from '@angular/core/testing';

import { DeviceassigndepartmentmodelService } from './deviceassigndepartmentmodel.service';

describe('DeviceassigndepartmentmodelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeviceassigndepartmentmodelService = TestBed.get(DeviceassigndepartmentmodelService);
    expect(service).toBeTruthy();
  });
});
