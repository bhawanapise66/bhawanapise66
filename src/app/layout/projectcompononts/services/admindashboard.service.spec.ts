import { TestBed } from '@angular/core/testing';

import { AdmindashboardService } from './admindashboard.service';

describe('AdmindashboardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdmindashboardService = TestBed.get(AdmindashboardService);
    expect(service).toBeTruthy();
  });
});
