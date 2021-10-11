import { TestBed } from '@angular/core/testing';

import { TranlogserviceService } from './tranlogservice.service';

describe('TranlogserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TranlogserviceService = TestBed.get(TranlogserviceService);
    expect(service).toBeTruthy();
  });
});
