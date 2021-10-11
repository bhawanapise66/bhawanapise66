import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubdivmappingdetailsComponent } from './subdivmappingdetails.component';

describe('SubdivmappingdetailsComponent', () => {
  let component: SubdivmappingdetailsComponent;
  let fixture: ComponentFixture<SubdivmappingdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubdivmappingdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubdivmappingdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
