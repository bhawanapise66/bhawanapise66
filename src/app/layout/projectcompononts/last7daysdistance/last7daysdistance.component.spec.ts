import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Last7daysdistanceComponent } from './last7daysdistance.component';

describe('Last7daysdistanceComponent', () => {
  let component: Last7daysdistanceComponent;
  let fixture: ComponentFixture<Last7daysdistanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Last7daysdistanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Last7daysdistanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
