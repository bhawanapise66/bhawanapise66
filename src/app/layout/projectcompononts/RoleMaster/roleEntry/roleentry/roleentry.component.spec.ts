import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleentryComponent } from './roleentry.component';

describe('RoleentryComponent', () => {
  let component: RoleentryComponent;
  let fixture: ComponentFixture<RoleentryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleentryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleentryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
