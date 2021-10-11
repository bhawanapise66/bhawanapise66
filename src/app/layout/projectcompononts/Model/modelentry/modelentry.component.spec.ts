import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelentryComponent } from './modelentry.component';

describe('ModelentryComponent', () => {
  let component: ModelentryComponent;
  let fixture: ComponentFixture<ModelentryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelentryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelentryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
