import { TestBed } from '@angular/core/testing';

import { DivisionmodelService } from './divisionmodel.service';

describe('DivisionmodelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DivisionmodelService = TestBed.get(DivisionmodelService);
    expect(service).toBeTruthy();
  });
});
