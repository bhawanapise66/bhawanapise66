import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevicetypeentryComponent } from './devicetypeentry.component';

describe('DevicetypeentryComponent', () => {
  let component: DevicetypeentryComponent;
  let fixture: ComponentFixture<DevicetypeentryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevicetypeentryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevicetypeentryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
