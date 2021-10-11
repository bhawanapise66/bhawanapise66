import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeebulkuploadComponent } from './employeebulkupload.component';

describe('EmployeebulkuploadComponent', () => {
  let component: EmployeebulkuploadComponent;
  let fixture: ComponentFixture<EmployeebulkuploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeebulkuploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeebulkuploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
