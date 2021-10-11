import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatrolmanExceptionReportComponent } from './patrolman-exception-report.component';

describe('PatrolmanExceptionReportComponent', () => {
  let component: PatrolmanExceptionReportComponent;
  let fixture: ComponentFixture<PatrolmanExceptionReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatrolmanExceptionReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatrolmanExceptionReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
