import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeofeceInoutComponent } from './geofece-inout.component';

describe('GeofeceInoutComponent', () => {
  let component: GeofeceInoutComponent;
  let fixture: ComponentFixture<GeofeceInoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeofeceInoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeofeceInoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
