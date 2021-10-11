import { TestBed } from '@angular/core/testing';

import { KModulelistbindingService } from './kmodulelistbinding.service';

describe('KModulelistbindingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KModulelistbindingService = TestBed.get(KModulelistbindingService);
    expect(service).toBeTruthy();
  });
});
