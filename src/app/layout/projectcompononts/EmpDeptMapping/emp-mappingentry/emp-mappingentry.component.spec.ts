import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpMappingentryComponent } from './emp-mappingentry.component';

describe('EmpMappingentryComponent', () => {
  let component: EmpMappingentryComponent;
  let fixture: ComponentFixture<EmpMappingentryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpMappingentryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpMappingentryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
