import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignationentryComponent } from './designationentry.component';

describe('DesignationentryComponent', () => {
  let component: DesignationentryComponent;
  let fixture: ComponentFixture<DesignationentryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesignationentryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignationentryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
