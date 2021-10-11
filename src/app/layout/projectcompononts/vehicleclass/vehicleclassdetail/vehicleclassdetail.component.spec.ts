import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleclassdetailComponent } from './vehicleclassdetail.component';

describe('VehicleclassdetailComponent', () => {
  let component: VehicleclassdetailComponent;
  let fixture: ComponentFixture<VehicleclassdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleclassdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleclassdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
