import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { USFDAndPushTrolleyReportComponent } from './usfd-and-push-trolley-report.component';

describe('USFDAndPushTrolleyReportComponent', () => {
  let component: USFDAndPushTrolleyReportComponent;
  let fixture: ComponentFixture<USFDAndPushTrolleyReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ USFDAndPushTrolleyReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(USFDAndPushTrolleyReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
