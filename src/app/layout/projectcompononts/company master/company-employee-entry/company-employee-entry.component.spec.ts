import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyEmployeeEntryComponent } from './company-employee-entry.component';

describe('CompanyEmployeeEntryComponent', () => {
  let component: CompanyEmployeeEntryComponent;
  let fixture: ComponentFixture<CompanyEmployeeEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyEmployeeEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyEmployeeEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
