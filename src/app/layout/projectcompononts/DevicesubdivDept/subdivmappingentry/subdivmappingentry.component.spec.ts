import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubdivmappingentryComponent } from './subdivmappingentry.component';

describe('SubdivmappingentryComponent', () => {
  let component: SubdivmappingentryComponent;
  let fixture: ComponentFixture<SubdivmappingentryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubdivmappingentryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubdivmappingentryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
