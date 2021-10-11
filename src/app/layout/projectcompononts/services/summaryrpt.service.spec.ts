import { TestBed } from '@angular/core/testing';

import { SummaryrptService } from './summaryrpt.service';

describe('SummaryrptService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SummaryrptService = TestBed.get(SummaryrptService);
    expect(service).toBeTruthy();
  });
});
