import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuRoleWiseComponent } from './menu-role-wise.component';

describe('MenuRoleWiseComponent', () => {
  let component: MenuRoleWiseComponent;
  let fixture: ComponentFixture<MenuRoleWiseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuRoleWiseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuRoleWiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
