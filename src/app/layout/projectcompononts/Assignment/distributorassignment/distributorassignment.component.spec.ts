import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributorassignmentComponent } from './distributorassignment.component';

describe('DistributorassignmentComponent', () => {
  let component: DistributorassignmentComponent;
  let fixture: ComponentFixture<DistributorassignmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistributorassignmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistributorassignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
