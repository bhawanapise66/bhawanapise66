import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributordevicemappingdetailComponent } from './distributordevicemappingdetail.component';

describe('DistributordevicemappingdetailComponent', () => {
  let component: DistributordevicemappingdetailComponent;
  let fixture: ComponentFixture<DistributordevicemappingdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistributordevicemappingdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistributordevicemappingdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
