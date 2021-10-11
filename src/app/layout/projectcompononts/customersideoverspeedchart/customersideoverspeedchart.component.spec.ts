import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersideoverspeedchartComponent } from './customersideoverspeedchart.component';

describe('CustomersideoverspeedchartComponent', () => {
  let component: CustomersideoverspeedchartComponent;
  let fixture: ComponentFixture<CustomersideoverspeedchartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomersideoverspeedchartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersideoverspeedchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
