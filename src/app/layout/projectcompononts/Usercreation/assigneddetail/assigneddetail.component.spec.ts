import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssigneddetailComponent } from './assigneddetail.component';

describe('AssigneddetailComponent', () => {
  let component: AssigneddetailComponent;
  let fixture: ComponentFixture<AssigneddetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssigneddetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssigneddetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
