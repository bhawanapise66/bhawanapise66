import { TestBed } from '@angular/core/testing';

import { DeletedlogdetailsService } from './deletedlogdetails.service';

describe('DeletedlogdetailsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeletedlogdetailsService = TestBed.get(DeletedlogdetailsService);
    expect(service).toBeTruthy();
  });
});
