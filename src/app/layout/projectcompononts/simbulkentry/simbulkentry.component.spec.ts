import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimbulkentryComponent } from './simbulkentry.component';

describe('SimbulkentryComponent', () => {
  let component: SimbulkentryComponent;
  let fixture: ComponentFixture<SimbulkentryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimbulkentryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimbulkentryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
