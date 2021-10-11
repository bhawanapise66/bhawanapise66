import { TestBed } from '@angular/core/testing';

import { RailwaydashboardService } from './railwaydashboard.service';

describe('RailwaydashboardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RailwaydashboardService = TestBed.get(RailwaydashboardService);
    expect(service).toBeTruthy();
  });
});
