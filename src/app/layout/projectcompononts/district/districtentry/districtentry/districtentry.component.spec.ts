import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistrictentryComponent } from './districtentry.component';

describe('DistrictentryComponent', () => {
  let component: DistrictentryComponent;
  let fixture: ComponentFixture<DistrictentryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistrictentryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistrictentryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
