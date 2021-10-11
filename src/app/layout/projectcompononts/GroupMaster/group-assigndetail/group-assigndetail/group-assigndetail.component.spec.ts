import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupAssigndetailComponent } from './group-assigndetail.component';

describe('GroupAssigndetailComponent', () => {
  let component: GroupAssigndetailComponent;
  let fixture: ComponentFixture<GroupAssigndetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupAssigndetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupAssigndetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
