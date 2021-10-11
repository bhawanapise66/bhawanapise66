import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginActivityReportComponent } from './login-activity-report.component';

describe('LoginActivityReportComponent', () => {
  let component: LoginActivityReportComponent;
  let fixture: ComponentFixture<LoginActivityReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginActivityReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginActivityReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
