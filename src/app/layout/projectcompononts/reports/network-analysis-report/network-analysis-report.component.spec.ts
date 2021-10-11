import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkAnalysisReportComponent } from './network-analysis-report.component';

describe('NetworkAnalysisReportComponent', () => {
  let component: NetworkAnalysisReportComponent;
  let fixture: ComponentFixture<NetworkAnalysisReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NetworkAnalysisReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetworkAnalysisReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
