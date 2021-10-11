import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceMappingentryComponent } from './device-mappingentry.component';

describe('DeviceMappingentryComponent', () => {
  let component: DeviceMappingentryComponent;
  let fixture: ComponentFixture<DeviceMappingentryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceMappingentryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceMappingentryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
