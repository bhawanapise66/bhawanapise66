import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmindevicestaticsComponent } from './admindevicestatics.component';

describe('AdmindevicestaticsComponent', () => {
  let component: AdmindevicestaticsComponent;
  let fixture: ComponentFixture<AdmindevicestaticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmindevicestaticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmindevicestaticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
