import { TestBed } from '@angular/core/testing';

import { AdmindashrlyService } from './admindashrly.service';

describe('AdmindashrlyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdmindashrlyService = TestBed.get(AdmindashrlyService);
    expect(service).toBeTruthy();
  });
});
