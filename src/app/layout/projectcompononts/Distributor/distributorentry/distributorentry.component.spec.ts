import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributorentryComponent } from './distributorentry.component';

describe('DistributorentryComponent', () => {
  let component: DistributorentryComponent;
  let fixture: ComponentFixture<DistributorentryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistributorentryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistributorentryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
