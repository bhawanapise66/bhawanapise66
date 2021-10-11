import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingpageRoleWiseComponent } from './landingpage-role-wise.component';

describe('LandingpageRoleWiseComponent', () => {
  let component: LandingpageRoleWiseComponent;
  let fixture: ComponentFixture<LandingpageRoleWiseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandingpageRoleWiseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingpageRoleWiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
