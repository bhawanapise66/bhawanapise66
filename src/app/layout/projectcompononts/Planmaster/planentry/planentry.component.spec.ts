import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanentryComponent } from './planentry.component';

describe('PlanentryComponent', () => {
  let component: PlanentryComponent;
  let fixture: ComponentFixture<PlanentryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanentryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanentryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
