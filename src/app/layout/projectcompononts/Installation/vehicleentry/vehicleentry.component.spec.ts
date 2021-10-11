import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleentryComponent } from './vehicleentry.component';

describe('VehicleentryComponent', () => {
  let component: VehicleentryComponent;
  let fixture: ComponentFixture<VehicleentryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleentryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleentryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
