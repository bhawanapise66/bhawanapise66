import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationentryComponent } from './notificationentry.component';

describe('NotificationentryComponent', () => {
  let component: NotificationentryComponent;
  let fixture: ComponentFixture<NotificationentryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationentryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationentryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
