import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverEntryComponent } from './driver-entry.component';

describe('DriverEntryComponent', () => {
  let component: DriverEntryComponent;
  let fixture: ComponentFixture<DriverEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
