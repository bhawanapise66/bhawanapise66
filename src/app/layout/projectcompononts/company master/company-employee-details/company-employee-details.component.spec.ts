import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyEmployeeDetailsComponent } from './company-employee-details.component';

describe('CompanyEmployeeDetailsComponent', () => {
  let component: CompanyEmployeeDetailsComponent;
  let fixture: ComponentFixture<CompanyEmployeeDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyEmployeeDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyEmployeeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
