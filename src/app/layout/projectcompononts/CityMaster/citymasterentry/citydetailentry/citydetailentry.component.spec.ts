import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CitydetailentryComponent } from './citydetailentry.component';

describe('CitydetailentryComponent', () => {
  let component: CitydetailentryComponent;
  let fixture: ComponentFixture<CitydetailentryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CitydetailentryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CitydetailentryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
