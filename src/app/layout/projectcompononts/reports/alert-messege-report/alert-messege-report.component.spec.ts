import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertMessegeReportComponent } from './alert-messege-report.component';

describe('AlertMessegeReportComponent', () => {
  let component: AlertMessegeReportComponent;
  let fixture: ComponentFixture<AlertMessegeReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertMessegeReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertMessegeReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
