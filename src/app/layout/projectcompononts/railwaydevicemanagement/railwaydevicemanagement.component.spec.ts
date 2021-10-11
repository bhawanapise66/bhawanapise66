import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RailwaydevicemanagementComponent } from './railwaydevicemanagement.component';

describe('RailwaydevicemanagementComponent', () => {
  let component: RailwaydevicemanagementComponent;
  let fixture: ComponentFixture<RailwaydevicemanagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RailwaydevicemanagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RailwaydevicemanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
