import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistassdetailsComponent } from './distassdetails.component';

describe('DistassdetailsComponent', () => {
  let component: DistassdetailsComponent;
  let fixture: ComponentFixture<DistassdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistassdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistassdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
