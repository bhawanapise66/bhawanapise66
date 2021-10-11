import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeemappentryComponent } from './employeemappentry.component';

describe('EmployeemappentryComponent', () => {
  let component: EmployeemappentryComponent;
  let fixture: ComponentFixture<EmployeemappentryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeemappentryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeemappentryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
