import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceMappingdetailsComponent } from './device-mappingdetails.component';

describe('DeviceMappingdetailsComponent', () => {
  let component: DeviceMappingdetailsComponent;
  let fixture: ComponentFixture<DeviceMappingdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceMappingdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceMappingdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
