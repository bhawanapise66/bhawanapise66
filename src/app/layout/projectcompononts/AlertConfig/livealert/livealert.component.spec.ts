import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LivealertComponent } from './livealert.component';

describe('LivealertComponent', () => {
  let component: LivealertComponent;
  let fixture: ComponentFixture<LivealertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LivealertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LivealertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
