import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiclemodelentryComponent } from './vehiclemodelentry.component';

describe('VehiclemodelentryComponent', () => {
  let component: VehiclemodelentryComponent;
  let fixture: ComponentFixture<VehiclemodelentryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehiclemodelentryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehiclemodelentryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
