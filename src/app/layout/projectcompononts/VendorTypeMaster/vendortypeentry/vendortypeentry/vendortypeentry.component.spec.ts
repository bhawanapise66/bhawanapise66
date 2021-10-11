import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendortypeentryComponent } from './vendortypeentry.component';

describe('VendortypeentryComponent', () => {
  let component: VendortypeentryComponent;
  let fixture: ComponentFixture<VendortypeentryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendortypeentryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendortypeentryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
