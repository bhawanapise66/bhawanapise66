import { TestBed } from '@angular/core/testing';

import { UsercreationmodelService } from './usercreationmodel.service';

describe('UsercreationmodelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UsercreationmodelService = TestBed.get(UsercreationmodelService);
    expect(service).toBeTruthy();
  });
});
