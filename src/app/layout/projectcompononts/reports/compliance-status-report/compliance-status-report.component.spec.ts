import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplianceStatusReportComponent } from './compliance-status-report.component';

describe('ComplianceStatusReportComponent', () => {
  let component: ComplianceStatusReportComponent;
  let fixture: ComponentFixture<ComplianceStatusReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComplianceStatusReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplianceStatusReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
