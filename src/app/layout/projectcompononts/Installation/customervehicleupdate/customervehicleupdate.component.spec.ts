import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomervehicleupdateComponent } from './customervehicleupdate.component';

describe('CustomervehicleupdateComponent', () => {
  let component: CustomervehicleupdateComponent;
  let fixture: ComponentFixture<CustomervehicleupdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomervehicleupdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomervehicleupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
