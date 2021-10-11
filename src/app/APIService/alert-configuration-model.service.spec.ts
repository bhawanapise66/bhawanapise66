import { TestBed } from '@angular/core/testing';

import { AlertConfigurationModelService } from './alert-configuration-model.service';

describe('AlertConfigurationModelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AlertConfigurationModelService = TestBed.get(AlertConfigurationModelService);
    expect(service).toBeTruthy();
  });
});
