import { TestBed } from '@angular/core/testing';

import { NewUserCreationModelService } from './new-user-creation-model.service';

describe('NewUserCreationModelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NewUserCreationModelService = TestBed.get(NewUserCreationModelService);
    expect(service).toBeTruthy();
  });
});
