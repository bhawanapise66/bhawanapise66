import { TestBed } from '@angular/core/testing';

import { NotificationmodelService } from './notificationmodel.service';

describe('NotificationmodelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NotificationmodelService = TestBed.get(NotificationmodelService);
    expect(service).toBeTruthy();
  });
});
