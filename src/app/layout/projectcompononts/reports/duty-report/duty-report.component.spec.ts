import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DutyReportComponent } from './duty-report.component';

describe('DutyReportComponent', () => {
  let component: DutyReportComponent;
  let fixture: ComponentFixture<DutyReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DutyReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DutyReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
