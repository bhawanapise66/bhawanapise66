import { DistanceTravelledReportComponent } from './distance-travelled-report.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';



describe('ReportComponent', () => {
  let component: DistanceTravelledReportComponent;
  let fixture: ComponentFixture<DistanceTravelledReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistanceTravelledReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistanceTravelledReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
