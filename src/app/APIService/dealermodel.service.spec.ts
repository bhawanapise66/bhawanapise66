import { TestBed } from '@angular/core/testing';

import { DealermodelService } from './dealermodel.service';

describe('DealermodelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DealermodelService = TestBed.get(DealermodelService);
    expect(service).toBeTruthy();
  });
});
