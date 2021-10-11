import { VehicleMakeentryComponent } from './vehiclemakeentry.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

 
describe('VehiclemakeentryComponent', () => {
  let component: VehicleMakeentryComponent;
  let fixture: ComponentFixture<VehicleMakeentryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleMakeentryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleMakeentryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
