import { TestBed } from '@angular/core/testing';

import { CustomermodelService } from './customermodel.service';

describe('CustomermodelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CustomermodelService = TestBed.get(CustomermodelService);
    expect(service).toBeTruthy();
  });
});
