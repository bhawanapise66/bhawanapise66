import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminpaymentstatgraphComponent } from './adminpaymentstatgraph.component';

describe('AdminpaymentstatgraphComponent', () => {
  let component: AdminpaymentstatgraphComponent;
  let fixture: ComponentFixture<AdminpaymentstatgraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminpaymentstatgraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminpaymentstatgraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
