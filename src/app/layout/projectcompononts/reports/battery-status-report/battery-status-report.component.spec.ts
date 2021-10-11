import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BatteryStatusReportComponent } from './battery-status-report.component';

describe('BatteryStatusReportComponent', () => {
  let component: BatteryStatusReportComponent;
  let fixture: ComponentFixture<BatteryStatusReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BatteryStatusReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BatteryStatusReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
