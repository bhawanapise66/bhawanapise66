import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupcreationentryComponent } from './groupcreationentry.component';

describe('GroupcreationentryComponent', () => {
  let component: GroupcreationentryComponent;
  let fixture: ComponentFixture<GroupcreationentryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupcreationentryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupcreationentryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
