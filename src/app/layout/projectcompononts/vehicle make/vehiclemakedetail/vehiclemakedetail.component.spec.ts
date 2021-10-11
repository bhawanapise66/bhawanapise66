import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiclemakedetailComponent } from './vehiclemakedetail.component';

describe('VehiclemakedetailComponent', () => {
  let component: VehiclemakedetailComponent;
  let fixture: ComponentFixture<VehiclemakedetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehiclemakedetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehiclemakedetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
