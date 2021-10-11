import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginCreationEntryComponent } from './login-creation-entry.component';

describe('LoginCreationEntryComponent', () => {
  let component: LoginCreationEntryComponent;
  let fixture: ComponentFixture<LoginCreationEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginCreationEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginCreationEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
