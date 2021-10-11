import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatedlogdetailsComponent } from './updatedlogdetails.component';

describe('UpdatedlogdetailsComponent', () => {
  let component: UpdatedlogdetailsComponent;
  let fixture: ComponentFixture<UpdatedlogdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatedlogdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatedlogdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
