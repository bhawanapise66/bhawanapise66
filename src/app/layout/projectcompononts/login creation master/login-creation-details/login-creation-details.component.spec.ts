import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginCreationDetailsComponent } from './login-creation-details.component';

describe('LoginCreationDetailsComponent', () => {
  let component: LoginCreationDetailsComponent;
  let fixture: ComponentFixture<LoginCreationDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginCreationDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginCreationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
