import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerDeviceDetailsComponent } from './customer-device-details.component';

describe('CustomerDeviceDetailsComponent', () => {
  let component: CustomerDeviceDetailsComponent;
  let fixture: ComponentFixture<CustomerDeviceDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerDeviceDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerDeviceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
