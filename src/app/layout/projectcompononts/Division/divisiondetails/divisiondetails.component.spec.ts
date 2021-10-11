import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DivisiondetailsComponent } from './divisiondetails.component';

describe('DivisiondetailsComponent', () => {
  let component: DivisiondetailsComponent;
  let fixture: ComponentFixture<DivisiondetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DivisiondetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DivisiondetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
