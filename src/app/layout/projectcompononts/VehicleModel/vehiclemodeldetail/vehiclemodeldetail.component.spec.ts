import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiclemodeldetailComponent } from './vehiclemodeldetail.component';

describe('VehiclemodeldetailComponent', () => {
  let component: VehiclemodeldetailComponent;
  let fixture: ComponentFixture<VehiclemodeldetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehiclemodeldetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehiclemodeldetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
