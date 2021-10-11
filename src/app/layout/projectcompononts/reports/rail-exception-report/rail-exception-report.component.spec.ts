import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RailExceptionReportComponent } from './rail-exception-report.component';

describe('RailExceptionReportComponent', () => {
  let component: RailExceptionReportComponent;
  let fixture: ComponentFixture<RailExceptionReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RailExceptionReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RailExceptionReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
