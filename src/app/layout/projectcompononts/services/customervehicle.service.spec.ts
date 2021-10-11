import { TestBed } from '@angular/core/testing';

import { CustomervehicleService } from './customervehicle.service';

describe('CustomervehicleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CustomervehicleService = TestBed.get(CustomervehicleService);
    expect(service).toBeTruthy();
  });
});
