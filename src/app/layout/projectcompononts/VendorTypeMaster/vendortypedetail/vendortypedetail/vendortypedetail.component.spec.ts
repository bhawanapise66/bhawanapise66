import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendortypedetailComponent } from './vendortypedetail.component';

describe('VendortypedetailComponent', () => {
  let component: VendortypedetailComponent;
  let fixture: ComponentFixture<VendortypedetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendortypedetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendortypedetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
