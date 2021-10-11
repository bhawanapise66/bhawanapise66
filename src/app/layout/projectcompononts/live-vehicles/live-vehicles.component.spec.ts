import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveVehiclesComponent } from './live-vehicles.component';

describe('LiveVehiclesComponent', () => {
  let component: LiveVehiclesComponent;
  let fixture: ComponentFixture<LiveVehiclesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveVehiclesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveVehiclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
