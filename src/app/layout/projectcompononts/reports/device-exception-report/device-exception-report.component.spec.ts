import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceExceptionReportComponent } from './device-exception-report.component';

describe('DeviceExceptionReportComponent', () => {
  let component: DeviceExceptionReportComponent;
  let fixture: ComponentFixture<DeviceExceptionReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceExceptionReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceExceptionReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
