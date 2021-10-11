import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconentryComponent } from './iconentry.component';

describe('IconentryComponent', () => {
  let component: IconentryComponent;
  let fixture: ComponentFixture<IconentryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconentryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconentryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
