import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuUserWiseComponent } from './menu-user-wise.component';

describe('MenuUserWiseComponent', () => {
  let component: MenuUserWiseComponent;
  let fixture: ComponentFixture<MenuUserWiseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuUserWiseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuUserWiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
