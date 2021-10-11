import { TestBed } from '@angular/core/testing';

import { NgIdleService } from './ng-idle.service';

describe('NgIdleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgIdleService = TestBed.get(NgIdleService);
    expect(service).toBeTruthy();
  });
});
