import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealassdetailsComponent } from './dealassdetails.component';

describe('DealassdetailsComponent', () => {
  let component: DealassdetailsComponent;
  let fixture: ComponentFixture<DealassdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealassdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealassdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
