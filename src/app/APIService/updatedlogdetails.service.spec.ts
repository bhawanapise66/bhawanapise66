import { TestBed } from '@angular/core/testing';

import { UpdatedlogdetailsService } from './updatedlogdetails.service';

describe('UpdatedlogdetailsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UpdatedlogdetailsService = TestBed.get(UpdatedlogdetailsService);
    expect(service).toBeTruthy();
  });
});
