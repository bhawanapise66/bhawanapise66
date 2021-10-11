import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkentryComponent } from './bulkentry.component';

describe('BulkentryComponent', () => {
  let component: BulkentryComponent;
  let fixture: ComponentFixture<BulkentryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BulkentryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkentryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
