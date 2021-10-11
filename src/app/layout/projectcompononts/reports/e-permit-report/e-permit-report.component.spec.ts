import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EPermitReportComponent } from './e-permit-report.component';

describe('EPermitReportComponent', () => {
  let component: EPermitReportComponent;
  let fixture: ComponentFixture<EPermitReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EPermitReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EPermitReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
