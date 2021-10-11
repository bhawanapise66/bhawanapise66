import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlastAlertComponent } from './flast-alert.component';

describe('FlastAlertComponent', () => {
  let component: FlastAlertComponent;
  let fixture: ComponentFixture<FlastAlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlastAlertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlastAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
