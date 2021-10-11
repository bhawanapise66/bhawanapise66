import { TestBed } from '@angular/core/testing';

import { SubDivisionService } from './sub-division.service';

describe('SubDivisionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SubDivisionService = TestBed.get(SubDivisionService);
    expect(service).toBeTruthy();
  });
});
