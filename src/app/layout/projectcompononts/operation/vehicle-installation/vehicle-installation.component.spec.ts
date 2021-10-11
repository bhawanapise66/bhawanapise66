import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleInstallationComponent } from './vehicle-installation.component';

describe('VehicleInstallationComponent', () => {
  let component: VehicleInstallationComponent;
  let fixture: ComponentFixture<VehicleInstallationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleInstallationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleInstallationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
