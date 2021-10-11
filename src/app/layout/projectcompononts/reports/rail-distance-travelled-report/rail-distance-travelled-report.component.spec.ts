import { RailDistanceTravelledReportComponent } from './rail-distance-travelled-report.component';
 import { async, ComponentFixture, TestBed } from '@angular/core/testing';



describe('ReportComponent', () => {
  let component: RailDistanceTravelledReportComponent;
  let fixture: ComponentFixture<RailDistanceTravelledReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RailDistanceTravelledReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RailDistanceTravelledReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
