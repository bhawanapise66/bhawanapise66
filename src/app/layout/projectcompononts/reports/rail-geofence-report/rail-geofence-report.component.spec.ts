import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RailGeofenceReportComponent } from './rail-geofence-report.component';

describe('RailGeofenceReportComponent', () => {
  let component: RailGeofenceReportComponent;
  let fixture: ComponentFixture<RailGeofenceReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RailGeofenceReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RailGeofenceReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
