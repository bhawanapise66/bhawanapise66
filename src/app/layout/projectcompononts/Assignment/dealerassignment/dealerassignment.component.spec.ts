import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealerassignmentComponent } from './dealerassignment.component';

describe('DealerassignmentComponent', () => {
  let component: DealerassignmentComponent;
  let fixture: ComponentFixture<DealerassignmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealerassignmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealerassignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
