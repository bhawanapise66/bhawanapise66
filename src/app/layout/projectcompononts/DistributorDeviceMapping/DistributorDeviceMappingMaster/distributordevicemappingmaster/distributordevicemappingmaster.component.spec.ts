import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributordevicemappingmasterComponent } from './distributordevicemappingmaster.component';

describe('DistributordevicemappingmasterComponent', () => {
  let component: DistributordevicemappingmasterComponent;
  let fixture: ComponentFixture<DistributordevicemappingmasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistributordevicemappingmasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistributordevicemappingmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
