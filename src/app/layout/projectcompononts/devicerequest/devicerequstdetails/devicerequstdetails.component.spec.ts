import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevicerequstdetailsComponent } from './devicerequstdetails.component';

describe('DevicerequstdetailsComponent', () => {
  let component: DevicerequstdetailsComponent;
  let fixture: ComponentFixture<DevicerequstdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevicerequstdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevicerequstdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
