import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealercustomergraphComponent } from './dealercustomergraph.component';

describe('DealercustomergraphComponent', () => {
  let component: DealercustomergraphComponent;
  let fixture: ComponentFixture<DealercustomergraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealercustomergraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealercustomergraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
