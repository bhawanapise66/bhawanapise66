import { TestBed } from '@angular/core/testing';

import { AssigndeviceemployeeService } from './assigndeviceemployee.service';

describe('AssigndeviceemployeeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AssigndeviceemployeeService = TestBed.get(AssigndeviceemployeeService);
    expect(service).toBeTruthy();
  });
});
