import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealerentryComponent } from './dealerentry.component';

describe('DealerentryComponent', () => {
  let component: DealerentryComponent;
  let fixture: ComponentFixture<DealerentryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealerentryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealerentryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
