import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdleReportComponent } from './idle-report.component';

describe('IdleReportComponent', () => {
  let component: IdleReportComponent;
  let fixture: ComponentFixture<IdleReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdleReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdleReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
