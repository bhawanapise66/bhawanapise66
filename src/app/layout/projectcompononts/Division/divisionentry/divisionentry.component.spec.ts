import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DivisionentryComponent } from './divisionentry.component';

describe('DivisionentryComponent', () => {
  let component: DivisionentryComponent;
  let fixture: ComponentFixture<DivisionentryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DivisionentryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DivisionentryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
