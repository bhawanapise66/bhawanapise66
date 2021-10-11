import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupcreationdetailComponent } from './groupcreationdetail.component';

describe('GroupcreationdetailComponent', () => {
  let component: GroupcreationdetailComponent;
  let fixture: ComponentFixture<GroupcreationdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupcreationdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupcreationdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
