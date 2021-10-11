import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssigndevicesimmappingComponent } from './assigndevicesimmapping.component';

describe('AssigndevicesimmappingComponent', () => {
  let component: AssigndevicesimmappingComponent;
  let fixture: ComponentFixture<AssigndevicesimmappingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssigndevicesimmappingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssigndevicesimmappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
