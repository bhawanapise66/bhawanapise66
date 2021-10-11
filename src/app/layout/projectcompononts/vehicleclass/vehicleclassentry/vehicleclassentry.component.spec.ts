import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleclassentryComponent } from './vehicleclassentry.component';

describe('VehicleclassentryComponent', () => {
  let component: VehicleclassentryComponent;
  let fixture: ComponentFixture<VehicleclassentryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleclassentryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleclassentryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
