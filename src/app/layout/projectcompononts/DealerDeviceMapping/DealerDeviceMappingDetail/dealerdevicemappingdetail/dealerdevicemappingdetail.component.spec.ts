import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealerdevicemappingdetailComponent } from './dealerdevicemappingdetail.component';

describe('DealerdevicemappingdetailComponent', () => {
  let component: DealerdevicemappingdetailComponent;
  let fixture: ComponentFixture<DealerdevicemappingdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealerdevicemappingdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealerdevicemappingdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
