import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingpageUserWiseComponent } from './landingpage-user-wise.component';

describe('LandingpageUserWiseComponent', () => {
  let component: LandingpageUserWiseComponent;
  let fixture: ComponentFixture<LandingpageUserWiseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandingpageUserWiseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingpageUserWiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
