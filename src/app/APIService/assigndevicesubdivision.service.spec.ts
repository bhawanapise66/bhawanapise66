import { TestBed } from '@angular/core/testing';

import { AssigndevicesubdivisionService } from './assigndevicesubdivision.service';

describe('AssigndevicesubdivisionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AssigndevicesubdivisionService = TestBed.get(AssigndevicesubdivisionService);
    expect(service).toBeTruthy();
  });
});
