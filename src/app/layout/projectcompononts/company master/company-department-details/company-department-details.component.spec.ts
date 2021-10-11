import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyDepartmentDetailsComponent } from './company-department-details.component';

describe('CompanyDepartmentDetailsComponent', () => {
  let component: CompanyDepartmentDetailsComponent;
  let fixture: ComponentFixture<CompanyDepartmentDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyDepartmentDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyDepartmentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
