import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpMappingdetailsComponent } from './emp-mappingdetails.component';

describe('EmpMappingdetailsComponent', () => {
  let component: EmpMappingdetailsComponent;
  let fixture: ComponentFixture<EmpMappingdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpMappingdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpMappingdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
