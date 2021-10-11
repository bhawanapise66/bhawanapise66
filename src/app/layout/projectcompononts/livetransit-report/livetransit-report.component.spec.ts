import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LivetransitReportComponent } from './livetransit-report.component';

describe('LivetransitReportComponent', () => {
  let component: LivetransitReportComponent;
  let fixture: ComponentFixture<LivetransitReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LivetransitReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LivetransitReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
