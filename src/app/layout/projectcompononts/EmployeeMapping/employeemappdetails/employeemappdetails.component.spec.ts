import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeemappdetailsComponent } from './employeemappdetails.component';

describe('EmployeemappdetailsComponent', () => {
  let component: EmployeemappdetailsComponent;
  let fixture: ComponentFixture<EmployeemappdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeemappdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeemappdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
