import { VehicleMakedetailComponent } from './vehiclemakedetail.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

 
describe('VehiclemakedetailComponent', () => {
  let component: VehicleMakedetailComponent;
  let fixture: ComponentFixture<VehicleMakedetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleMakedetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleMakedetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
