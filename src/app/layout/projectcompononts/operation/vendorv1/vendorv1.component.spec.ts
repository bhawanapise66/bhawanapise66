import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Vendorv1Component } from './vendorv1.component';

describe('Vendorv1Component', () => {
  let component: Vendorv1Component;
  let fixture: ComponentFixture<Vendorv1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Vendorv1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Vendorv1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
