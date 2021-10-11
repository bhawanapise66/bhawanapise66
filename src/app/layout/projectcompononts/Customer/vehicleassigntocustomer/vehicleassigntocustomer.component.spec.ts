import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleassigntocustomerComponent } from './vehicleassigntocustomer.component';

describe('VehicleassigntocustomerComponent', () => {
  let component: VehicleassigntocustomerComponent;
  let fixture: ComponentFixture<VehicleassigntocustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleassigntocustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleassigntocustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
