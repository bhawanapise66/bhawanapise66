import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationdetailComponent } from './notificationdetail.component';

describe('NotificationdetailComponent', () => {
  let component: NotificationdetailComponent;
  let fixture: ComponentFixture<NotificationdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
