import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevicesingleentryComponent } from './devicesingleentry.component';

describe('DevicesingleentryComponent', () => {
  let component: DevicesingleentryComponent;
  let fixture: ComponentFixture<DevicesingleentryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevicesingleentryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevicesingleentryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
