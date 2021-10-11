import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginCreationComponent } from './login-creation.component';

describe('LoginCreationComponent', () => {
  let component: LoginCreationComponent;
  let fixture: ComponentFixture<LoginCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginCreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
