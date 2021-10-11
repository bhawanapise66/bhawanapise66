import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceDistanceReportComponent } from './device-distance-report.component';

describe('DeviceDistanceReportComponent', () => {
  let component: DeviceDistanceReportComponent;
  let fixture: ComponentFixture<DeviceDistanceReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceDistanceReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceDistanceReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
