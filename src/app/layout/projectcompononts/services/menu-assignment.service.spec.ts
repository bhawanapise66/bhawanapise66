import { TestBed } from '@angular/core/testing';

import { MenuAssignmentService } from './menu-assignment.service';

describe('MenuAssignmentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MenuAssignmentService = TestBed.get(MenuAssignmentService);
    expect(service).toBeTruthy();
  });
});
