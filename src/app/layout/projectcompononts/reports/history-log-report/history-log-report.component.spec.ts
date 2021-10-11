import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryLogReportComponent } from './history-log-report.component';

describe('HistoryLogReportComponent', () => {
  let component: HistoryLogReportComponent;
  let fixture: ComponentFixture<HistoryLogReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryLogReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryLogReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
