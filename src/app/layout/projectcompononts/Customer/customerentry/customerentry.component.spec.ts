import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerentryComponent } from './customerentry.component';

describe('CustomerentryComponent', () => {
  let component: CustomerentryComponent;
  let fixture: ComponentFixture<CustomerentryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerentryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerentryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
