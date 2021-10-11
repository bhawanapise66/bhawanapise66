import { TestBed } from '@angular/core/testing';

import { UploadimageoneService } from './uploadimageone.service';

describe('UploadimageoneService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UploadimageoneService = TestBed.get(UploadimageoneService);
    expect(service).toBeTruthy();
  });
});
