import { TestBed } from '@angular/core/testing';

import { DealermasterService } from './dealermaster.service';

describe('DealermasterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DealermasterService = TestBed.get(DealermasterService);
    expect(service).toBeTruthy();
  });
});
