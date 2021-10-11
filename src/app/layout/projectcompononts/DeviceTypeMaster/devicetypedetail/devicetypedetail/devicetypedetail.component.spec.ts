import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevicetypedetailComponent } from './devicetypedetail.component';

describe('DevicetypedetailComponent', () => {
  let component: DevicetypedetailComponent;
  let fixture: ComponentFixture<DevicetypedetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevicetypedetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevicetypedetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
