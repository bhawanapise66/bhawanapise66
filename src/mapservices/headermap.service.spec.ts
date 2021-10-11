import { TestBed } from '@angular/core/testing';

import { HeadermapService } from './headermap.service';

describe('HeadermapService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HeadermapService = TestBed.get(HeadermapService);
    expect(service).toBeTruthy();
  });
});
