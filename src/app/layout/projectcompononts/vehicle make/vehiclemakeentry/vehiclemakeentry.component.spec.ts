import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiclemakeentryComponent } from './vehiclemakeentry.component';

describe('VehiclemakeentryComponent', () => {
  let component: VehiclemakeentryComponent;
  let fixture: ComponentFixture<VehiclemakeentryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehiclemakeentryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehiclemakeentryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
