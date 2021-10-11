import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkVehicleEntryComponent } from './bulk-vehicle-entry.component';

describe('BulkVehicleEntryComponent', () => {
  let component: BulkVehicleEntryComponent;
  let fixture: ComponentFixture<BulkVehicleEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BulkVehicleEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkVehicleEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
