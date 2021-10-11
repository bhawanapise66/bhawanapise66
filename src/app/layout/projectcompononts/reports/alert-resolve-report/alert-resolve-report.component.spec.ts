import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertResolveReportComponent } from './alert-resolve-report.component';

describe('AlertResolveReportComponent', () => {
  let component: AlertResolveReportComponent;
  let fixture: ComponentFixture<AlertResolveReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertResolveReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertResolveReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
