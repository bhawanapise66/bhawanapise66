import { TestBed } from '@angular/core/testing';

import { PoiassignService } from './poiassign.service';

describe('PoiassignService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PoiassignService = TestBed.get(PoiassignService);
    expect(service).toBeTruthy();
  });
});
