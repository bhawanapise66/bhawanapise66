import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerdashboardoverspeedComponent } from './customerdashboardoverspeed.component';

describe('CustomerdashboardoverspeedComponent', () => {
  let component: CustomerdashboardoverspeedComponent;
  let fixture: ComponentFixture<CustomerdashboardoverspeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerdashboardoverspeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerdashboardoverspeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
