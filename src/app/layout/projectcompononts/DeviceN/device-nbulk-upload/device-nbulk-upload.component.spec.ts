import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceNbulkUploadComponent } from './device-nbulk-upload.component';

describe('DeviceNbulkUploadComponent', () => {
  let component: DeviceNbulkUploadComponent;
  let fixture: ComponentFixture<DeviceNbulkUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceNbulkUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceNbulkUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
