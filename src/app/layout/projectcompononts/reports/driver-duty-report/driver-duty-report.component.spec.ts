import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverDutyReportComponent } from './driver-duty-report.component';

describe('DriverDutyReportComponent', () => {
  let component: DriverDutyReportComponent;
  let fixture: ComponentFixture<DriverDutyReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverDutyReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverDutyReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
