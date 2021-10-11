import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeentryComponent } from './employeeentry.component';

describe('EmployeeentryComponent', () => {
  let component: EmployeeentryComponent;
  let fixture: ComponentFixture<EmployeeentryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeentryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeentryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
