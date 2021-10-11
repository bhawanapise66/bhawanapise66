import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistrictdetailsComponent } from './districtdetails.component';

describe('DistrictdetailsComponent', () => {
  let component: DistrictdetailsComponent;
  let fixture: ComponentFixture<DistrictdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistrictdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistrictdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
