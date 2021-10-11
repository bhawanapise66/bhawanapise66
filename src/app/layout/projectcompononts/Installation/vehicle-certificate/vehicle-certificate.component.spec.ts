import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleCertificateComponent } from './vehicle-certificate.component';

describe('VehicleCertificateComponent', () => {
  let component: VehicleCertificateComponent;
  let fixture: ComponentFixture<VehicleCertificateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleCertificateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
