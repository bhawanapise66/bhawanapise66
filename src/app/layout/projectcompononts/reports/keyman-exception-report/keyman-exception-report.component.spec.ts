import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeymanExceptionReportComponent } from './keyman-exception-report.component';

describe('KeymanExceptionReportComponent', () => {
  let component: KeymanExceptionReportComponent;
  let fixture: ComponentFixture<KeymanExceptionReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeymanExceptionReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeymanExceptionReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
