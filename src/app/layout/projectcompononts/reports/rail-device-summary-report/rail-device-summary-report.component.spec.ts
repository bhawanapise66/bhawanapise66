import { RailDeviceSummaryReportComponent } from './rail-device-summary-report.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

 
describe('RailDeviceSummeryReportComponent', () => {
  let component: RailDeviceSummaryReportComponent;
  let fixture: ComponentFixture<RailDeviceSummaryReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RailDeviceSummaryReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RailDeviceSummaryReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
