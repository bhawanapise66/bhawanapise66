import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleSummeryReportComponent } from './vehicle-summery-report.component';

describe('VehicleSummeryReportComponent', () => {
  let component: VehicleSummeryReportComponent;
  let fixture: ComponentFixture<VehicleSummeryReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleSummeryReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleSummeryReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
