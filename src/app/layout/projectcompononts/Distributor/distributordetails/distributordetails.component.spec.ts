import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributordetailsComponent } from './distributordetails.component';

describe('DistributordetailsComponent', () => {
  let component: DistributordetailsComponent;
  let fixture: ComponentFixture<DistributordetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistributordetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistributordetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
