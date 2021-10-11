import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkentryComponent } from './networkentry.component';

describe('NetworkentryComponent', () => {
  let component: NetworkentryComponent;
  let fixture: ComponentFixture<NetworkentryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NetworkentryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetworkentryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
