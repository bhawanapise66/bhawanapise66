import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RailRoutedeviationReportComponent } from './rail-routedeviation-report.component';

describe('RailRoutedeviationReportComponent', () => {
  let component: RailRoutedeviationReportComponent;
  let fixture: ComponentFixture<RailRoutedeviationReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RailRoutedeviationReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RailRoutedeviationReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
