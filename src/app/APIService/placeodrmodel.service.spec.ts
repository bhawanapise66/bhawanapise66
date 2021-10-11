import { TestBed } from '@angular/core/testing';

import { PlaceodrmodelService } from './placeodrmodel.service';

describe('PlaceodrmodelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlaceodrmodelService = TestBed.get(PlaceodrmodelService);
    expect(service).toBeTruthy();
  });
});
