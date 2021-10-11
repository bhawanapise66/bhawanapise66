import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimentryComponent } from './simentry.component';

describe('SimentryComponent', () => {
  let component: SimentryComponent;
  let fixture: ComponentFixture<SimentryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimentryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimentryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
