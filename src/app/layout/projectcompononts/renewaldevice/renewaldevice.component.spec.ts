import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenewaldeviceComponent } from './renewaldevice.component';

describe('RenewaldeviceComponent', () => {
  let component: RenewaldeviceComponent;
  let fixture: ComponentFixture<RenewaldeviceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenewaldeviceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenewaldeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
