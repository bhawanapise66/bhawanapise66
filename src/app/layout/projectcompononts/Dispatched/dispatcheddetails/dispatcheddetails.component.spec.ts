import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DispatcheddetailsComponent } from './dispatcheddetails.component';

describe('DispatcheddetailsComponent', () => {
  let component: DispatcheddetailsComponent;
  let fixture: ComponentFixture<DispatcheddetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DispatcheddetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DispatcheddetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
