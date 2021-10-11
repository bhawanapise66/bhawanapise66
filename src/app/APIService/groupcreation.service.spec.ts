import { TestBed } from '@angular/core/testing';

import { GroupcreationService } from './groupcreation.service';

describe('GroupcreationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GroupcreationService = TestBed.get(GroupcreationService);
    expect(service).toBeTruthy();
  });
});
