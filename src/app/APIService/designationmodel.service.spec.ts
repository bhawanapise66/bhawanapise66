import { TestBed } from '@angular/core/testing';

import { DesignationmodelService } from './designationmodel.service';

describe('DesignationmodelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DesignationmodelService = TestBed.get(DesignationmodelService);
    expect(service).toBeTruthy();
  });
});
