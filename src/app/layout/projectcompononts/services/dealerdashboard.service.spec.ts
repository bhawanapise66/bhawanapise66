import { TestBed } from '@angular/core/testing';

import { DealerdashboardService } from './dealerdashboard.service';

describe('DealerdashboardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DealerdashboardService = TestBed.get(DealerdashboardService);
    expect(service).toBeTruthy();
  });
});
