import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaptrackComponent } from './maptrack.component';

describe('MaptrackComponent', () => {
  let component: MaptrackComponent;
  let fixture: ComponentFixture<MaptrackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaptrackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaptrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
