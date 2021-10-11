import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyDepartmentEntryComponent } from './company-department-entry.component';

describe('CompanyDepartmentEntryComponent', () => {
  let component: CompanyDepartmentEntryComponent;
  let fixture: ComponentFixture<CompanyDepartmentEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyDepartmentEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyDepartmentEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
