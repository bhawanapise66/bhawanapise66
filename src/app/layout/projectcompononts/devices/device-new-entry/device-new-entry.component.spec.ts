import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceNewEntryComponent } from './device-new-entry.component';

describe('DeviceNewEntryComponent', () => {
  let component: DeviceNewEntryComponent;
  let fixture: ComponentFixture<DeviceNewEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceNewEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceNewEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
