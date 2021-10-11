import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceSimMappingComponent } from './device-sim-mapping.component';

describe('DeviceSimMappingComponent', () => {
  let component: DeviceSimMappingComponent;
  let fixture: ComponentFixture<DeviceSimMappingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceSimMappingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceSimMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
