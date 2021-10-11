import { TestBed } from '@angular/core/testing';

import { EmployeemodelService } from './employeemodel.service';

describe('EmployeemodelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmployeemodelService = TestBed.get(EmployeemodelService);
    expect(service).toBeTruthy();
  });
});
