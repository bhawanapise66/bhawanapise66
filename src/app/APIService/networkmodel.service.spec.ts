import { TestBed } from '@angular/core/testing';

import { NetworkmodelService } from './networkmodel.service';

describe('NetworkmodelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NetworkmodelService = TestBed.get(NetworkmodelService);
    expect(service).toBeTruthy();
  });
});
