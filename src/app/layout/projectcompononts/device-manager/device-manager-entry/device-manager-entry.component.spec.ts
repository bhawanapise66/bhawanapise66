import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceManagerEntryComponent } from './device-manager-entry.component';

describe('DeviceManagerEntryComponent', () => {
  let component: DeviceManagerEntryComponent;
  let fixture: ComponentFixture<DeviceManagerEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceManagerEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceManagerEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
