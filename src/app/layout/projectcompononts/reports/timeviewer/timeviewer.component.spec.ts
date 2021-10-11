import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeviewerComponent } from './timeviewer.component';

describe('TimeviewerComponent', () => {
  let component: TimeviewerComponent;
  let fixture: ComponentFixture<TimeviewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeviewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeviewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
