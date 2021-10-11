import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertConfigDetailsComponent } from './alert-config-details.component';

describe('AlertConfigDetailsComponent', () => {
  let component: AlertConfigDetailsComponent;
  let fixture: ComponentFixture<AlertConfigDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertConfigDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertConfigDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
