import { TestBed } from '@angular/core/testing';

import { DispatchedinstalledService } from './dispatchedinstalled.service';

describe('DispatchedinstalledService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DispatchedinstalledService = TestBed.get(DispatchedinstalledService);
    expect(service).toBeTruthy();
  });
});
